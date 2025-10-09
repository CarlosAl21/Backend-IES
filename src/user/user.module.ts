// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { InstitucionFinanciera } from 'src/institucion-financiera/entities/institucion-financiera.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, InstitucionFinanciera]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
