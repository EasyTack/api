import { Controller, Get, Param } from '@nestjs/common';
import { FactoriesService } from 'src/factories/factories.service';
import { PacotesService } from 'src/pacotes/pacotes.service';

@Controller('rest-request')
export class RestRequestController {
  constructor(private readonly pacotesService: PacotesService, private readonly factoriesServices: FactoriesService) { }
  @Get(':operador_logistico/:codigo_pacote')
  async getPacoteLogistica(@Param('operador_logistico') operador_logistico: string, @Param('codigo_pacote') codigo_pacote: string) {
    const operador_movimentacoes = await this.pacotesService.getPacoteLogistica(operador_logistico, codigo_pacote);
    let registroMovimentacoes = [];
    switch (operador_movimentacoes.operador_logistico.documento) {
      case '34028316000103':
        registroMovimentacoes = this.factoriesServices.correios(operador_movimentacoes.pacoteMovimentacoes);
        break;
      default:
        break;
    }
    return registroMovimentacoes;
  }
}
