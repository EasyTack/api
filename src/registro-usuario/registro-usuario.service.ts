import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { RegistroUsuarioDto } from './dto/registro-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './../usuarios/entities/usuario.entity';
import { Repository } from 'typeorm';
import { Configuracao } from 'src/configuracoes/entities/configuracao.entity';
import { RegistroUsuario } from './entities/registro-usuario.entity';

@Injectable()
export class RegistroUsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly repositoryUsuario: Repository<Usuario>,
    @InjectRepository(Configuracao)
    private readonly repositoryConfiguracao: Repository<Configuracao>,
  ) {}
  public async register(
    registerUserDto: RegistroUsuarioDto,
  ): Promise<RegistroUsuario> {
    registerUserDto.senha = bcrypt.hashSync(registerUserDto.senha, 8);
    const configuracao = await this.repositoryConfiguracao.save({
      update_automatico: true,
      tipo_ordenacao_padrao: 0,
      intervalo_atualizacao: 1,
      horario_comercial_atualizacao: false,
    });
    const usuario = await this.repositoryUsuario.save({
      ...registerUserDto,
      configuracao,
    });
    return { usuario, configuracao };
  }
}
