import { Module } from '@nestjs/common';
import { SparqlService } from './sparql.service';
import { SparqlController } from './sparql.controller';
import { OperadoresLogisticosService } from 'src/operadores-logisticos/operadores-logisticos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperadorLogistico } from 'src/operadores-logisticos/entities/operador-logistico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OperadorLogistico])],
  controllers: [SparqlController],
  providers: [SparqlService, OperadoresLogisticosService],
})
export class SparqlModule {}
