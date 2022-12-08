import { IEtiqueta } from "src/etiquetas/interfaces/etiqueta.interface";
import { IOperadorLogistico } from "src/operadores-logisticos/interfaces/operador-logistico.interface";
import { IRegistroMovimentacao } from "src/registro-movimentacoes/interfaces/registro-movimentacao.interface";
import { IUsuario } from "src/usuarios/interfaces/usuario.interface";

export class CreatePacoteDto {
    data_postagem: Date;
    data_entrega: Date;
    codigo_operador_logistico: string;
    local_origem: string;
    local_destino: string;
    status: string;
    movimentacoes: IRegistroMovimentacao[];
    etiquetas: IEtiqueta[];
    usuario: IUsuario;
    operador_logistico: IOperadorLogistico;
}
