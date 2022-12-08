import { Controller, Get, Param } from '@nestjs/common';
import { PacotesService } from 'src/pacotes/pacotes.service';
import { RestRequestService } from './rest-request.service';

@Controller('rest-request')
export class RestRequestController {
  constructor(private readonly pacotesService: PacotesService) { }
  @Get(':operador_logistico/:codigo_pacote')
  async getPacoteLogistica(@Param('operador_logistico') operador_logistico: string, @Param('codigo_pacote') codigo_pacote: string) {
    const operador_pacote = await this.pacotesService.getPacoteLogistica(operador_logistico, codigo_pacote);
    
    return operador_pacote;
  }
}
