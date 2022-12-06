import { Test, TestingModule } from '@nestjs/testing';
import { PacotesService } from './pacotes.service';

describe('PacotesService', () => {
  let service: PacotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PacotesService],
    }).compile();

    service = module.get<PacotesService>(PacotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
