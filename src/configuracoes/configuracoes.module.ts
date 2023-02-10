import { Module } from '@nestjs/common';
import { ConfiguracoesService } from './configuracoes.service';
import { ConfiguracoesController } from './configuracoes.controller';
import { Configuracao } from './entities/configuracao.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Configuracao])],
  controllers: [ConfiguracoesController],
  providers: [ConfiguracoesService],
})
export class ConfiguracoesModule {}
