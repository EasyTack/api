import { IEntidade } from '../../abstracoes/interface/ientidade';

export interface IEtiqueta extends IEntidade {
    readonly nome: string;
    readonly cor: string;
    readonly codigo: string;
}
