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

@Module({
  imports: [TypeOrmModule.forFeature([Pacote, RegistroMovimentacao, OperadorLogistico])],
  controllers: [PacotesController],
  providers: [PacotesService, RestRequestService, FactoriesService, RegistroMovimentacoesService]
})
export class PacotesModule { }
