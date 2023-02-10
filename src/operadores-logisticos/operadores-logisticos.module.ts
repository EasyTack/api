import { Module } from '@nestjs/common';
import { OperadoresLogisticosService } from './operadores-logisticos.service';
import { OperadoresLogisticosController } from './operadores-logisticos.controller';
import { OperadorLogistico } from './entities/operador-logistico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OperadorLogistico])],
  controllers: [OperadoresLogisticosController],
  providers: [OperadoresLogisticosService],
})
export class OperadoresLogisticosModule {}
