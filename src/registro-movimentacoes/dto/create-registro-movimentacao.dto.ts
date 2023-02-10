import { IPacote } from 'src/pacotes/interfaces/pacote.interface';

export class CreateRegistroMovimentacaoDto {
  data_movimentacao: Date;
  local_origem: string;
  local_destino: string;
  status: string;
  response: object;
  pacote: IPacote;
}
