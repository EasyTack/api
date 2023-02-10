import { IEntidade } from '../../abstracoes/interface/ientidade';

export interface IOperadorLogistico extends IEntidade {
  readonly documento: string;
  readonly razao_social: string;
  readonly nome_fantasia: string;
}
