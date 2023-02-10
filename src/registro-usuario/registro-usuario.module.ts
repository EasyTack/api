import { Module } from '@nestjs/common';
import { RegistroUsuarioService } from './registro-usuario.service';
import { RegistroUsuarioController } from './registro-usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { Configuracao } from 'src/configuracoes/entities/configuracao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario, Configuracao])],
  controllers: [RegistroUsuarioController],
  providers: [RegistroUsuarioService],
})
export class RegistroUsuarioModule {}
