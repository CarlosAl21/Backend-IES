import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { InstitucionFinancieraModule } from './institucion-financiera/institucion-financiera.module';
import { User } from './user/entities/user.entity';
import { InstitucionFinanciera } from './institucion-financiera/entities/institucion-financiera.entity';
import { InversionesModule } from './inversiones/inversiones.module';
import { CreditosModule } from './creditos/creditos.module';
import { Inversiones } from './inversiones/entities/inversione.entity';
import { Credito } from './creditos/entities/credito.entity';
import { SolicitudesInversionModule } from './solicitudes-inversion/solicitudes-inversion.module';
import { SolicitudesInversion } from './solicitudes-inversion/entities/solicitudes-inversion.entity';
import { CloudinaryModule } from './cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: (process.env.DB_TYPE as any) || 'mysql',          // MySQL o MariaDB
      host: process.env.DB_HOST || 'localhost',      // tu servidor de XAMPP
      port: Number(process.env.DB_PORT) || 3306,             // puerto por defecto de MySQL
      username: process.env.DB_USERNAME || 'root',       // tu usuario de MySQL
      password: process.env.DB_PASSWORD || '',           // tu contraseña, si tienes
      database: process.env.DB_DATABASE || 'proyectoeconomia',  // reemplaza con el nombre de tu base de datos
      entities: [
        User, 
        InstitucionFinanciera,
        Inversiones,
        Credito,
        SolicitudesInversion,
        
      ],       // todas las entidades que uses
      synchronize: true,      // para desarrollo: crea las tablas automáticamente
    }),
    UserModule,
    AuthModule,
    InstitucionFinancieraModule,
    InversionesModule,
    CreditosModule,
    SolicitudesInversionModule,
    CloudinaryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
