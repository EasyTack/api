import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { IUsuario } from '../usuarios/interfaces/usuario.interface';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly usersService: UsuariosService,
    private readonly jwtService: JwtService,
  ) { }

  private async validate(loginDto: LoginDto): Promise<IUsuario> {
    return await this.usersService.findByUser(loginDto.usuario);
  }

  public async login(
    loginDto: LoginDto,
  ): Promise<any | { status: number; message: string }> {
    return this.validate(loginDto)
      .then((userData) => {
        if (!userData) {
          throw new UnauthorizedException();
        }

        const passwordIsValid = bcrypt.compareSync(
          loginDto.senha,
          userData.senha,
        );

        if (!passwordIsValid == true) {
          return {
            message: 'Authentication failed. Wrong senha',
            status: 400,
          };
        }

        const payload = {
          name: userData.usuario,
          email: userData.email,
          id: userData.id,
        };

        const accessToken = this.jwtService.sign(payload);

        return {
          expiresIn: 3600,
          accessToken: accessToken,
          usuario: payload,
          status: 200,
        };
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.BAD_REQUEST);
      });
  }

  public async validateUserByJwt(payload: JwtPayload) {
    // This will be used when the usuario has already logged in and has a JWT
    const usuario = await this.usersService.findByEmail(payload.usuario);

    if (!usuario) {
      throw new UnauthorizedException();
    }
    return this.createJwtPayload(usuario);
  }

  protected createJwtPayload(usuario) {
    const data: JwtPayload = {
      usuario: usuario.usuario,
    };

    const jwt = this.jwtService.sign(data);

    return {
      expiresIn: 3600,
      token: jwt,
    };
  }
}
