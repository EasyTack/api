import { Etiqueta } from "../../etiquetas/entities/etiqueta.entity";
import { IEntidade } from "../../abstracoes/interface/ientidade";
import { RegistroMovimentacao } from "../../registro-movimentacoes/entities/registro-movimentacao.entity";
import { OperadorLogistico } from "../../operadores-logisticos/entities/operador-logistico.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity";

export interface IPacote extends IEntidade {
    readonly data_postagem: Date;
    readonly data_entrega: Date;
    readonly codigo_operador_logistico: string;
    readonly local_origem: string;
    readonly local_destino: string;
    readonly status: string;
}