import { PickType } from '@nestjs/swagger';
import { UsuarioDto } from '../../usuarios/dto/usuario.dto';

export class LoginDto extends PickType(UsuarioDto, [
  'usuario',
  'senha',
] as const) {}
