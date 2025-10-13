import { Injectable } from '@nestjs/common';
import { CreateInstitucionFinancieraDto } from './dto/create-institucion-financiera.dto';
import { UpdateInstitucionFinancieraDto } from './dto/update-institucion-financiera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitucionFinanciera } from './entities/institucion-financiera.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class InstitucionFinancieraService {
  constructor(
    @InjectRepository(InstitucionFinanciera)
    private readonly institucionFinancieraRepository: Repository<InstitucionFinanciera>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(createInstitucionFinancieraDto: CreateInstitucionFinancieraDto, files?: Array<Express.Multer.File>) {
    try {
      // Mapear DTO a entidad InstitucionFinanciera (nombres distintos)
      const institucionFinanciera = this.institucionFinancieraRepository.create({
        name: createInstitucionFinancieraDto.nombre,
        mission: createInstitucionFinancieraDto.mission,
        vision: createInstitucionFinancieraDto.vision,
        primaryColor: createInstitucionFinancieraDto.primaryColor,
        secondaryColor: createInstitucionFinancieraDto.secondaryColor,
      });

      // Si hay archivos, subirlos a Cloudinary y crear los registros de fotos
      if (files && files.length > 0) {
        const uploadPromises = files.map(file => this.cloudinaryService.upload(file));
        const uploadResults = await Promise.all(uploadPromises);

        const fotosPromises = uploadResults.map(result =>
          institucionFinanciera.logo_url = result.secure_url
        );

        await Promise.all(fotosPromises);
      }

      await this.institucionFinancieraRepository.save(institucionFinanciera);

      // Crear el usuario administrador con los datos del DTO y asignarle la institución
      const newUser = this.userRepository.create({
        firstName: createInstitucionFinancieraDto.firstNameAdmin,
        lastName: createInstitucionFinancieraDto.lastNameAdmin,
        secondName: createInstitucionFinancieraDto.secondNameAdmin,
        secondLastName: createInstitucionFinancieraDto.secondLastNameAdmin,
        phone: createInstitucionFinancieraDto.phoneAdmin,
        homePhone: createInstitucionFinancieraDto.homePhoneAdmin,
        cedula: createInstitucionFinancieraDto.cedulaAdmin,
        email: createInstitucionFinancieraDto.emailAdmin,
        password: createInstitucionFinancieraDto.passwordAdmin,
        role: 'Administrador', // rol por defecto como administrador
        idInstitucionFinanciera: institucionFinanciera,
      } as Partial<User>);

      await this.userRepository.save(newUser);
      return institucionFinanciera;
    } catch (error) {
      console.error('Error creating institucionFinanciera:', error);
      throw new Error('Error creating institucionFinanciera');
    }
  }

  async findAll() {
    try {
      const alias = 'institucion';
      const instituciones = await this.institucionFinancieraRepository
        .createQueryBuilder(alias)
        // 'users' es la propiedad definida en la entidad InstitucionFinanciera
        .leftJoinAndSelect(`${alias}.users`, 'user', 'user.role = :role', { role: 'Administrador' })
        .getMany();

      return instituciones;
    } catch (error) {
      console.error('Error finding all institucionFinanciera:', error);
      throw new Error('Error finding all institucionFinanciera');
    }
  }

  async findOne(id: string) {
    try {
      return await this.institucionFinancieraRepository.findOneBy({ idInstitucionFinanciera: id });
    } catch (error) {
      console.error('Error finding institucionFinanciera:', error);
      throw new Error('Error finding institucionFinanciera');
    }
  }

  async update(id: string, updateInstitucionFinancieraDto: UpdateInstitucionFinancieraDto, files?: Array<Express.Multer.File>) {
    try {
      const institucionFinanciera = await this.institucionFinancieraRepository.findOneBy({ idInstitucionFinanciera: id });
      if (!institucionFinanciera) {
        throw new Error('InstitucionFinanciera not found');
      }

      // Merge básico de campos (hereda de PartialType)
      this.institucionFinancieraRepository.merge(institucionFinanciera, updateInstitucionFinancieraDto);

      // Si llegan archivos, subir a Cloudinary y actualizar logo_url (tomamos el primer archivo válido)
      if (files && files.length > 0) {
        const uploadPromises = files.map(file => this.cloudinaryService.upload(file));
        const uploadResults = await Promise.all(uploadPromises);

        // Buscar la primera URL válida
        const firstUrl = uploadResults
          .map((r: any) => r?.secure_url)
          .find((u: string | undefined) => typeof u === 'string' && u.length > 0);

        if (firstUrl) {
          institucionFinanciera.logo_url = firstUrl;
        }
      }

      return await this.institucionFinancieraRepository.save(institucionFinanciera);
    } catch (error) {
      console.error('Error updating institucionFinanciera:', error);
      throw new Error('Error updating institucionFinanciera');
    }
  }

  async remove(id: string) {
    try {
      const institucionFinanciera = await this.institucionFinancieraRepository.findOneBy({ idInstitucionFinanciera: id });
      if (!institucionFinanciera) {
        throw new Error('InstitucionFinanciera not found');
      }
      institucionFinanciera.isActive = false;
      await this.institucionFinancieraRepository.save(institucionFinanciera);
      return { deleted: true };
    } catch (error) {
      console.error('Error removing institucionFinanciera:', error);
      throw new Error('Error removing institucionFinanciera');
    }
  }
}
