import { Test, TestingModule } from '@nestjs/testing';
import { OperadoresLogisticosService } from './operadores-logisticos.service';

describe('OperadoresLogisticosService', () => {
  let service: OperadoresLogisticosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OperadoresLogisticosService],
    }).compile();

    service = module.get<OperadoresLogisticosService>(
      OperadoresLogisticosService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
