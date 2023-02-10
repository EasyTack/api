import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroMovimentacoesService } from './registro-movimentacoes.service';
import { RegistroMovimentacoesController } from './registro-movimentacoes.controller';
import { RegistroMovimentacao } from './entities/registro-movimentacao.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroMovimentacao])],
  controllers: [RegistroMovimentacoesController],
  providers: [RegistroMovimentacoesService],
})
export class RegistroMovimentacoesModule {}
