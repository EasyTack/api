import { Module } from '@nestjs/common';
import { RegistroUsuarioService } from './registro-usuario.service';
import { RegistroUsuarioController } from './registro-usuario.controller';
import { UsuariosService } from '../usuarios/usuarios.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  controllers: [RegistroUsuarioController],
  providers: [RegistroUsuarioService,UsuariosService]
})
export class RegistroUsuarioModule {}
