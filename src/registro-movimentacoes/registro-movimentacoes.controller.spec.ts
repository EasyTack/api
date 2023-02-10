import { Test, TestingModule } from '@nestjs/testing';
import { RegistroMovimentacoesController } from './registro-movimentacoes.controller';
import { RegistroMovimentacoesService } from './registro-movimentacoes.service';

describe('RegistroMovimentacoesController', () => {
  let controller: RegistroMovimentacoesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistroMovimentacoesController],
      providers: [RegistroMovimentacoesService],
    }).compile();

    controller = module.get<RegistroMovimentacoesController>(
      RegistroMovimentacoesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
