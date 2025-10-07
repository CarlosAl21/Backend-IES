import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { InstitucionFinancieraModule } from './institucion-financiera/institucion-financiera.module';

@Module({
  imports: [UserModule, AuthModule, InstitucionFinancieraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
