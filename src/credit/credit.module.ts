import { IndirectChargeOrmEntity } from './entities/indirect-charge.orm-entity';
import { AmortizationTableOrmEntity } from './entities/amortization-table.orm-entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreditService } from './credit.service';
import { CreditController } from './credit.controller';
import { CreditTypeOrmEntity } from './entities/credit-type.orm-entity';
import { CreditSimulationOrmEntity } from './entities/credit-simulation.orm-entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    CreditTypeOrmEntity,
    CreditSimulationOrmEntity,
    IndirectChargeOrmEntity,
    AmortizationTableOrmEntity,
  ])],
  controllers: [CreditController],
  providers: [CreditService],
})
export class CreditModule {}
