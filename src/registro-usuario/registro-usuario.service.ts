import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { IUsuario } from '../usuarios/interfaces/usuario.interface';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RegistroUsuarioDto } from './dto/registro-usuario.dto';
import { ConfiguracoesService } from 'src/configuracoes/configuracoes.service';

@Injectable()
export class RegistroUsuarioService {
  constructor(
    private readonly usersService: UsuariosService,
    private readonly configuracoesService: ConfiguracoesService,
  ) { }
  public async register(
    registerUserDto: RegistroUsuarioDto
  ): Promise<IUsuario> {
    registerUserDto.senha = bcrypt.hashSync(registerUserDto.senha, 8);
    const usuario = await this.usersService.create(registerUserDto);
    const configuracao = await this.configuracoesService.create({
      update_automatico: true,
      tipo_ordenacao_padrao: 0,
      intervalo_atualizacao: 1,
      horario_comercial_atualizacao: false,
      usuario: usuario
    });
    return usuario;
  }
}
