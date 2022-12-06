import { Test, TestingModule } from '@nestjs/testing';
import { RestRequestController } from './rest-request.controller';
import { RestRequestService } from './rest-request.service';

describe('RestRequestController', () => {
  let controller: RestRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RestRequestController],
      providers: [RestRequestService],
    }).compile();

    controller = module.get<RestRequestController>(RestRequestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
