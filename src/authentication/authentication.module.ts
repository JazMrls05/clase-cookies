import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Usuario, usuarioSchema } from './usuario.schema';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
      JwtModule.register({ // Acá se configura el Header del JWT.
      global: true,
      secret: "MiSuperClaveSecreta2026VamosPorLa4ta",// En un entorno de producción, esta clave debe ser almacenada de manera segura. 32 Caracteres MINIMO 
      signOptions: { expiresIn: '30s' }, // 2m, 4h, por ejemplo
    }),
    MongooseModule.forFeature([{ name: Usuario.name, schema: usuarioSchema }])
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
