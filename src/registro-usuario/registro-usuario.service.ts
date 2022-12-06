import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { IUsuario } from '../usuarios/interfaces/usuario.interface';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RegistroUsuarioDto } from './dto/registro-usuario.dto';

@Injectable()
export class RegistroUsuarioService {
  constructor(
    private readonly usersService: UsuariosService,
  ) { }
  public async register(
    registerUserDto: RegistroUsuarioDto
  ): Promise<IUsuario> {
    registerUserDto.senha = bcrypt.hashSync(registerUserDto.senha, 8);
    return this.usersService.create(registerUserDto);
  }
}
