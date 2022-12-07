import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { RegistroUsuarioService } from './registro-usuario.service';
import { RegistroUsuarioDto } from './dto/registro-usuario.dto';

@ApiTags('auth')
@Controller('auth/register')
export class RegistroUsuarioController {
  constructor(private readonly registroUsuarioService: RegistroUsuarioService) { }

  @Post()
  public async register(
    @Res() res,
    @Body() registerUserDto: RegistroUsuarioDto
  ): Promise<any> {
    try {
      await this.registroUsuarioService.register(registerUserDto);

      return res.status(HttpStatus.OK).json({
        message: 'Registro de usuário realizado com sucesso!',
        status: 200
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: Não foi possível registrar o usuário!',
        status: 400
      });
    }
  }
}
