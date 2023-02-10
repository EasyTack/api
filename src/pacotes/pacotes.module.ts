import { Module } from '@nestjs/common';
import { PacotesService } from './pacotes.service';
import { PacotesController } from './pacotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pacote } from './entities/pacote.entity';
import { RegistroMovimentacao } from '../registro-movimentacoes/entities/registro-movimentacao.entity';
import { RestRequestService } from '../rest-request/rest-request.service';
import { OperadorLogistico } from '../operadores-logisticos/entities/operador-logistico.entity';
import { FactoriesService } from '../factories/factories.service';
import { RegistroMovimentacoesService } from '../registro-movimentacoes/registro-movimentacoes.service';
import { UtilsService } from 'src/utils/utils.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pacote,
      RegistroMovimentacao,
      OperadorLogistico,
      Usuario,
    ]),
    ConfigModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY_JWT'),
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [PacotesController],
  providers: [
    PacotesService,
    RestRequestService,
    FactoriesService,
    RegistroMovimentacoesService,
    UtilsService,
    UsuariosService,
  ],
})
export class PacotesModule {}
