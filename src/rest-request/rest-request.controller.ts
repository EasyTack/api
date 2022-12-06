import { Controller, Get, Param } from '@nestjs/common';
import { RestRequestService } from './rest-request.service';

@Controller('rest-request')
export class RestRequestController {
  constructor(private readonly restRequestService: RestRequestService) { }
  @Get('correios/:codigo_pacote')
  getCorreios(@Param('codigo_pacote') codigo_pacote: string) {
    return this.restRequestService.getCorreios(codigo_pacote);
  }
}
