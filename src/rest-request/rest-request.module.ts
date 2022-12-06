import { Module } from '@nestjs/common';
import { RestRequestService } from './rest-request.service';
import { RestRequestController } from './rest-request.controller';

@Module({
  controllers: [RestRequestController],
  providers: [RestRequestService]
})
export class RestRequestModule {}
