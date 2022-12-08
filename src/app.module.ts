import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { ConfiguracoesModule } from './configuracoes/configuracoes.module';
import { RegistroMovimentacoesModule } from './registro-movimentacoes/registro-movimentacoes.module';
import { EtiquetasModule } from './etiquetas/etiquetas.module';
import { PacotesModule } from './pacotes/pacotes.module';
import { OperadoresLogisticosModule } from './operadores-logisticos/operadores-logisticos.module';
import { RestRequestModule } from './rest-request/rest-request.module';
import { LoginModule } from './login/login.module';
import { UtilsModule } from './utils/utils.module';
import { RegistroUsuarioModule } from './registro-usuario/registro-usuario.module';
import { FactoriesModule } from './factories/factories.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.getOrThrow<string>('TYPEORM_HOST'),
        port: config.getOrThrow<number>('TYPEORM_PORT'),
        username: config.getOrThrow<string>('TYPEORM_USERNAME'),
        password: config.getOrThrow<string>('TYPEORM_PASSWORD'),
        database: config.getOrThrow<string>('TYPEORM_DATABASE'),
        synchronize: true,
        entities: ['dist/**/*.entity.js'],
      })
    }),
    UsuariosModule,
    ConfiguracoesModule,
    RegistroMovimentacoesModule,
    EtiquetasModule,
    PacotesModule,
    OperadoresLogisticosModule,
    RestRequestModule,
    LoginModule,
    UtilsModule,
    RegistroUsuarioModule,
    FactoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
