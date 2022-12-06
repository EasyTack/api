import { Module } from '@nestjs/common';
import { PacotesService } from './pacotes.service';
import { PacotesController } from './pacotes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pacote } from './entities/pacote.entity';
import { RegistroMovimentacao } from '../registro-movimentacoes/entities/registro-movimentacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pacote, RegistroMovimentacao])],
  controllers: [PacotesController],
  providers: [PacotesService]
})
export class PacotesModule { }
