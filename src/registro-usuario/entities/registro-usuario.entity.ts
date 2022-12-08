import { IConfiguracao } from "../../configuracoes/interfaces/configuracao.interface";
import { IUsuario } from "../../usuarios/interfaces/usuario.interface";

export class RegistroUsuario implements IUsuario {
    usuario: string;
    email: string;
    senha: string;
    nome: string;
    sobrenome: string;
    documento: string;
    id: string;
    criado_em: Date;
    atualizado_em: Date;
    configuracao: IConfiguracao;
}
