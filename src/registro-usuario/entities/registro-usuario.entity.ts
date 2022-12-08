import { Configuracao } from "../../configuracoes/entities/configuracao.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity";

export class RegistroUsuario {
    usuario: Usuario;
    configuracao: Configuracao;
}
