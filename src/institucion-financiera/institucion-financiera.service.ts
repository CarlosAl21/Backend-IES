import { Injectable } from '@nestjs/common';
import { CreateInstitucionFinancieraDto } from './dto/create-institucion-financiera.dto';
import { UpdateInstitucionFinancieraDto } from './dto/update-institucion-financiera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { InstitucionFinanciera } from './entities/institucion-financiera.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class InstitucionFinancieraService {
  constructor(
    @InjectRepository(InstitucionFinanciera)
    private readonly institucionFinancieraRepository: Repository<InstitucionFinanciera>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createInstitucionFinancieraDto: CreateInstitucionFinancieraDto) {
    try {
      // prepare a username from the email (part before @) or fallback to 'admin'
      const username = createInstitucionFinancieraDto.emailAdmin
        ? String(createInstitucionFinancieraDto.emailAdmin).split('@')[0]
        : 'admin';

      const newUser = this.userRepository.create({
        email: createInstitucionFinancieraDto.emailAdmin,
        password: createInstitucionFinancieraDto.passwordAdmin,
        isAdmin: true,
        // default required fields so the entity can be saved
        name: createInstitucionFinancieraDto.adminName ?? 'Admin',
        lastname: createInstitucionFinancieraDto.adminLastname ?? 'Admin',
        username,
        cedula: createInstitucionFinancieraDto.adminCedula ?? '0000000000',
        birthdate: createInstitucionFinancieraDto.adminBirthdate
          ? new Date(createInstitucionFinancieraDto.adminBirthdate)
          : new Date('1970-01-01'),
        address: createInstitucionFinancieraDto.adminAddress ?? 'N/D',
        phone: createInstitucionFinancieraDto.adminPhone ?? '0000000000',
      });
      
      const institucionFinanciera = this.institucionFinancieraRepository.create(createInstitucionFinancieraDto);
      await this.institucionFinancieraRepository.save(institucionFinanciera);
      newUser.idInstitucionFinanciera = institucionFinanciera;
      await this.userRepository.save(newUser);
      return institucionFinanciera;
    } catch (error) {
      console.error('Error creating institucionFinanciera:', error);
      throw new Error('Error creating institucionFinanciera');
    }
  }

  async findAll() {
    try {
      return await this.institucionFinancieraRepository.find();
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

  async update(id: string, updateInstitucionFinancieraDto: UpdateInstitucionFinancieraDto) {
    try {
      await this.institucionFinancieraRepository.update(id, updateInstitucionFinancieraDto);
      return await this.institucionFinancieraRepository.findOneBy({ idInstitucionFinanciera: id });
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
