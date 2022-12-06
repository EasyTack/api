import { Test, TestingModule } from '@nestjs/testing';
import { RegistroMovimentacoesService } from './registro-movimentacoes.service';

describe('RegistroMovimentacoesService', () => {
  let service: RegistroMovimentacoesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroMovimentacoesService],
    }).compile();

    service = module.get<RegistroMovimentacoesService>(RegistroMovimentacoesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
