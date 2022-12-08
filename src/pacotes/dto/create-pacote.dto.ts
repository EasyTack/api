import { Etiqueta } from "src/etiquetas/entities/etiqueta.entity";
import { OperadorLogistico } from "src/operadores-logisticos/entities/operador-logistico.entity";
import { RegistroMovimentacao } from "src/registro-movimentacoes/entities/registro-movimentacao.entity";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { IPacote } from "../interfaces/pacote.interface";

export class CreatePacoteDto {
    data_postagem: Date;
    data_entrega: Date;
    codigo_operador_logistico: string;
    local_origem: string;
    local_destino: string;
    status: string;
}
