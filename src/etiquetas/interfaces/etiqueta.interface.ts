import { IEntidade } from '../../abstracoes/interface/ientidade';
import { Pacote } from '../../pacotes/entities/pacote.entity';

export interface IEtiqueta extends IEntidade {
    readonly nome: string;
    readonly cor: string;
    readonly codigo: string;
    readonly pacote: Pacote;
}
