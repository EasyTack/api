import { IPessoa } from "../../abstracoes/interface/ipessoa";
import { Configuracao } from "../../configuracoes/entities/configuracao.entity";

export interface IRegistroUsuario extends IPessoa {
    readonly usuario: string;
    readonly email: string;
    readonly senha: string;
}