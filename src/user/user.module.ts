// user.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { InstitucionFinancieraModule } from 'src/institucion-financiera/institucion-financiera.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    InstitucionFinancieraModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
