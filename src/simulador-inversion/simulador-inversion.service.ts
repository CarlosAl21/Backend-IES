import { Injectable } from '@nestjs/common';
import { CreateSimuladorInversionDto } from './dto/create-simulador-inversion.dto';
import { UpdateSimuladorInversionDto } from './dto/update-simulador-inversion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SimuladorInversion } from './entities/simulador-inversion.entity';
import { Repository } from 'typeorm';
import { TipoInversion } from 'src/tipo-inversion/entities/tipo-inversion.entity';

@Injectable()
export class SimuladorInversionService {
  constructor(
    @InjectRepository(SimuladorInversion)
    private simuladorInversionRepository: Repository<SimuladorInversion>,
    @InjectRepository(TipoInversion)
    private tipoInversionRepository: Repository<TipoInversion>,
  ) {}

  async create(createSimuladorInversionDto: CreateSimuladorInversionDto) {
    try {
      // Cargar tipo de inversion
      const tipoInversion = await this.tipoInversionRepository.findOne({
        where: { idTipoInversion: createSimuladorInversionDto.idTipoInversion },
      });
      if (!tipoInversion) {
        throw new Error('Tipo de inversión no encontrado');
      }

      if (tipoInversion.estado === false) {
        throw new Error('El tipo de inversión no está activo');
      }

      // Convertir valores (TypeORM puede devolver strings para decimal)
      const monto = Number(createSimuladorInversionDto.montoSimulado);
      const plazoDias = Number(createSimuladorInversionDto.plazoSimulado);
      const tasaAnual = parseFloat((tipoInversion as any).tasaRendimientoAnual as any) || 0;
      const plazoMinimo = Number(tipoInversion.plazoMinimoDias ?? 0);
      const montoMinimo = Number(tipoInversion.montoMinimo ?? 0);

      // Validaciones básicas
      if (isNaN(monto) || monto <= 0) {
        throw new Error('Monto inválido');
      }
      if (monto < montoMinimo) {
        throw new Error(`El monto mínimo para este tipo de inversión es ${montoMinimo}`);
      }
      if (isNaN(plazoDias) || plazoDias <= 0) {
        throw new Error('Plazo inválido');
      }
      if (plazoDias < plazoMinimo) {
        throw new Error(`El plazo mínimo para este tipo de inversión es ${plazoMinimo} días`);
      }

      // Cálculo de la simulación
      // Regla: si el plazo es de un mes (<= 30 días) usamos interés simple.
      // Si es mayor a 30 días usamos interés compuesto por meses calendario.
      const tabla: Array<{
        periodo: number;
        dias: number;
        fechaVencimiento: string;
        interes: number;
        saldo: number;
      }> = [];

      const fechaInicio = new Date(createSimuladorInversionDto.fechaSimulacion);

      if (plazoDias <= 30) {
        // Interés simple sobre el capital inicial
        const dailyRate = (tasaAnual / 100) / 365;
        const interesTotal = +(monto * dailyRate * plazoDias).toFixed(2);
        const fechaVencimiento = new Date(fechaInicio.getTime() + plazoDias * 24 * 60 * 60 * 1000);
        const saldoFinal = +(monto + interesTotal).toFixed(2);

        tabla.push({
          periodo: 1,
          dias: plazoDias,
          fechaVencimiento: fechaVencimiento.toISOString().split('T')[0],
          interes: interesTotal,
          saldo: saldoFinal,
        });

        const resultados = {
          principal: +monto.toFixed(2),
          tasaAnual: +tasaAnual,
          plazoDias,
          tabla,
          totalInteres: interesTotal,
          totalFinal: saldoFinal,
        };

        // Crear y guardar la simulación
        const nuevaSimulacion = this.simuladorInversionRepository.create({
          montoSimulado: monto,
          plazoSimulado: plazoDias,
          fechaSimulacion: fechaInicio,
          resultados,
          idTipoInversion: tipoInversion,
        } as any);

        await this.simuladorInversionRepository.save(nuevaSimulacion);
        return nuevaSimulacion;
      }

      // Interés compuesto por meses calendario
      const msPerDay = 24 * 60 * 60 * 1000;
      const rAnual = tasaAnual / 100;
      const rMonthly = rAnual / 12; // tasa por mes

      let remainingDays = plazoDias;
      let currentDate = new Date(fechaInicio);
      let periodoIndex = 1;
      let saldoPrevio = monto;

      while (remainingDays > 0) {
        // calcular días hasta el mismo día del mes siguiente (mes calendario)
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);

        // diferencia en días entre currentDate y nextMonth (puede ser 28..31)
        const daysInThisMonth = Math.round((nextMonth.getTime() - currentDate.getTime()) / msPerDay);

        const diasPeriodo = Math.min(daysInThisMonth, remainingDays);

        let factor: number;
        if (diasPeriodo === daysInThisMonth) {
          // mes completo -> aplicar capitalización mensual completa
          factor = 1 + rMonthly;
        } else {
          // periodo parcial de mes -> aplicar la fracción como potencia sobre el mes
          // usamos exponent = diasPeriodo / daysInThisMonth para aproximar la fracción del mes
          const frac = diasPeriodo / daysInThisMonth;
          factor = Math.pow(1 + rMonthly, frac);
        }

        const saldoNuevo = +(saldoPrevio * factor).toFixed(2);
        const interesPeriodo = +(saldoNuevo - saldoPrevio).toFixed(2);

        // avanzar la fecha por diasPeriodo
        currentDate = new Date(currentDate.getTime() + diasPeriodo * msPerDay);

        tabla.push({
          periodo: periodoIndex,
          dias: diasPeriodo,
          fechaVencimiento: currentDate.toISOString().split('T')[0],
          interes: interesPeriodo,
          saldo: saldoNuevo,
        });

        saldoPrevio = saldoNuevo;
        periodoIndex += 1;
        remainingDays -= diasPeriodo;
      }

      const totalInteres = +(saldoPrevio - monto).toFixed(2);
      const totalFinal = +saldoPrevio.toFixed(2);

      const resultados = {
        principal: +monto.toFixed(2),
        tasaAnual: +tasaAnual,
        plazoDias,
        tabla,
        totalInteres,
        totalFinal,
      };

      // Crear y guardar la simulación
      const nuevaSimulacion = this.simuladorInversionRepository.create({
        montoSimulado: monto,
        plazoSimulado: plazoDias,
        fechaSimulacion: new Date(createSimuladorInversionDto.fechaSimulacion),
        resultados,
        idTipoInversion: tipoInversion,
      } as any);

      await this.simuladorInversionRepository.save(nuevaSimulacion);

      return nuevaSimulacion;
    } catch (error) {
      console.error('Error creating simulador inversion:', error);
      throw new Error('Error creating simulador inversion');
    }
  }

  async findAll() {
    try {
      return await this.simuladorInversionRepository.find();
    } catch (error) {
      console.error('Error finding all simulador inversion:', error);
      throw new Error('Error finding all simulador inversion');
    }
  }

  async findOne(id: string) {
    try {
      return await this.simuladorInversionRepository.findOne({where: {idSimuladorInversion: id}});
    } catch (error) {
      console.error('Error finding simulador inversion:', error);
      throw new Error('Error finding simulador inversion');
    }
  }

  async update(id: string, updateSimuladorInversionDto: UpdateSimuladorInversionDto) {
    try {
      const simulacion = await this.simuladorInversionRepository.findOne({where: {idSimuladorInversion: id}});
      if (!simulacion) {
        throw new Error('Simulación no encontrada');
      }
      // Solo permitimos actualizar ciertos campos
      simulacion.montoSimulado = updateSimuladorInversionDto.montoSimulado ?? simulacion.montoSimulado;
      simulacion.plazoSimulado = updateSimuladorInversionDto.plazoSimulado ?? simulacion.plazoSimulado;
      simulacion.fechaSimulacion = updateSimuladorInversionDto.fechaSimulacion ? new Date(updateSimuladorInversionDto.fechaSimulacion) : simulacion.fechaSimulacion;
      await this.simuladorInversionRepository.save(simulacion);
      return simulacion;
    } catch (error) {
      console.error('Error updating simulador inversion:', error);
      throw new Error('Error updating simulador inversion');
    }
  }

  async remove(id: string) {
    try {
      const simulacion = await this.simuladorInversionRepository.findOne({where: {idSimuladorInversion: id}});
      if (!simulacion) {
        throw new Error('Simulación no encontrada');
      }
      await this.simuladorInversionRepository.remove(simulacion);
      return { message: 'Simulación eliminada con éxito' };
    } catch (error) {
      console.error('Error removing simulador inversion:', error);
      throw new Error('Error removing simulador inversion');
    }
  }
}
