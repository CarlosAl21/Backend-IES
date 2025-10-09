import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
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
