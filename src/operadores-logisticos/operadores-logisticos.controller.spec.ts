import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresLogisticosController } from './operadores-logisticos.controller';
import { OperadoresLogisticosService } from './operadores-logisticos.service';

describe('OperadoresLogisticosController', () => {
  let controller: OperadoresLogisticosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OperadoresLogisticosController],
      providers: [OperadoresLogisticosService],
    }).compile();

    controller = module.get<OperadoresLogisticosController>(OperadoresLogisticosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
