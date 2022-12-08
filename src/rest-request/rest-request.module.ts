import { Module } from '@nestjs/common';
import { RestRequestController } from './rest-request.controller';
import { PacotesService } from './../pacotes/pacotes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pacote } from 'src/pacotes/entities/pacote.entity';
import { RestRequestService } from './rest-request.service';
import { OperadorLogistico } from '../operadores-logisticos/entities/operador-logistico.entity';
import { RegistroMovimentacao } from '../registro-movimentacoes/entities/registro-movimentacao.entity';
import { FactoriesService } from 'src/factories/factories.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pacote, RegistroMovimentacao, OperadorLogistico])],
  controllers: [RestRequestController],
  providers: [RestRequestService, PacotesService, FactoriesService]
})
export class RestRequestModule { }
