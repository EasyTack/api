import { IEntidade } from "../../abstracoes/interface/ientidade";
import { Usuario } from "../../usuarios/entities/usuario.entity";

export interface IConfiguracao extends IEntidade {
    readonly update_automatico: boolean;
    readonly tipo_ordenacao_padrao: number;
    readonly intervalo_atualizacao: number;
    readonly horario_comercial_atualizacao: boolean;
    readonly usuario: Usuario;
}