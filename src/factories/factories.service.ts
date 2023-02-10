import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';

@Injectable()
export class FactoriesService {
  correios(response: any) {
    if (!response.eventos) return null;
    const registroMovimentacoes = [];
    for (const evento of response.eventos) {
      let local_origem = '';
      let local_destino = evento.local;

      if (
        evento.subStatus &&
        (evento.subStatus[0].startsWith('Registrado') ||
          evento.subStatus[0].startsWith('de') ||
          evento.subStatus[0].startsWith('Origem'))
      )
        local_origem = evento.subStatus[0].replace('Origem: ', '');
      if (
        evento.subStatus &&
        Array.isArray(evento.subStatus) &&
        evento.subStatus.length > 1 &&
        evento.subStatus[1].startsWith('Destino')
      )
        local_destino = evento.subStatus[1].replace('Destino: ', '');

      registroMovimentacoes.push({
        data_movimentacao: DateTime.fromFormat(
          evento.data,
          'dd/MM/yyyy',
        ).toISODate(),
        local_origem: local_origem,
        local_destino: local_destino,
        status: evento.status,
        response: evento,
      });
    }
    return registroMovimentacoes;
  }
}
