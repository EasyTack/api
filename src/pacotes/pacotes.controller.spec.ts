import { Test, TestingModule } from '@nestjs/testing';
import { PacotesController } from './pacotes.controller';
import { PacotesService } from './pacotes.service';

describe('PacotesController', () => {
  let controller: PacotesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PacotesController],
      providers: [PacotesService],
    }).compile();

    controller = module.get<PacotesController>(PacotesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
