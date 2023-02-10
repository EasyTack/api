import { IEntidade } from '../../abstracoes/interface/ientidade';

export interface IPacote extends IEntidade {
  readonly data_postagem: Date;
  readonly data_entrega: Date;
  readonly codigo_operador_logistico: string;
  readonly local_origem: string;
  readonly local_destino: string;
  readonly status: string;
}
