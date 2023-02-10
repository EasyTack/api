import { IEntidade } from '../../abstracoes/interface/ientidade';

export interface IRegistroMovimentacao extends IEntidade {
  readonly data_movimentacao: Date;
  readonly local_origem: string;
  readonly local_destino: string;
  readonly status: string;
  readonly response: object;
}
