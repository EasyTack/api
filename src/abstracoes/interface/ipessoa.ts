import { IEntidade } from "./ientidade";

export interface IPessoa extends IEntidade {
    readonly nome: string;
    readonly sobrenome: string;
    readonly documento: string;
}