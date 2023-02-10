import { Test, TestingModule } from '@nestjs/testing';
import { SparqlController } from './sparql.controller';
import { SparqlService } from './sparql.service';

describe('SparqlController', () => {
  let controller: SparqlController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SparqlController],
      providers: [SparqlService],
    }).compile();

    controller = module.get<SparqlController>(SparqlController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
