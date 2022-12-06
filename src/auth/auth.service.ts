import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { IUsuario } from '../usuarios/interfaces/usuario.interface';
import * as bcrypt from 'bcrypt';

import { AuthDto } from './dto/auth.dto';
import { JwtPayload } from './interfaces/jwt.payload';

@Injectable()
export class AuthService {
    constructor(
        private readonly usuariosService: UsuariosService,
        private readonly jwtService: JwtService
    ) { }

    private async validate(authDto: AuthDto): Promise<IUsuario> {
        return await this.usuariosService.findByEmail(authDto.email);
    }

    public async login(
        authDto: AuthDto
    ): Promise<any | { status: number; message: string }> {
        return this.validate(authDto)
            .then((userData) => {
                if (!userData) {
                    throw new UnauthorizedException();
                }

                const passwordIsValid = bcrypt.compareSync(
                    authDto.senha,
                    userData.senha
                );

                if (!passwordIsValid == true) {
                    return {
                        message: 'Authentication failed. Wrong senha',
                        status: 400
                    };
                }

                const payload = {
                    name: userData.usuario,
                    email: userData.email,
                    id: userData.id
                };

                const accessToken = this.jwtService.sign(payload);

                return {
                    expiresIn: 3600,
                    accessToken: accessToken,
                    usuario: payload,
                    status: 200
                };
            })
            .catch((err) => {
                throw new HttpException(err, HttpStatus.BAD_REQUEST);
            });
    }

    public async validateUserByJwt(payload: JwtPayload) {
        // This will be used when the usuario has already logged in and has a JWT
        const usuario = await this.usuariosService.findByEmail(payload.email);

        if (!usuario) {
            throw new UnauthorizedException();
        }
        return this.createJwtPayload(usuario);
    }

    protected createJwtPayload(usuario) {
        const data: JwtPayload = {
            email: usuario.email
        };

        const jwt = this.jwtService.sign(data);

        return {
            expiresIn: 3600,
            token: jwt
        };
    }
}
