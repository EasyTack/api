import { Test, TestingModule } from '@nestjs/testing';
import { RestRequestService } from './rest-request.service';

describe('RestRequestService', () => {
  let service: RestRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestRequestService],
    }).compile();

    service = module.get<RestRequestService>(RestRequestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
