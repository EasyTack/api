import { IUsuario } from "src/usuarios/interfaces/usuario.interface";

export class CreateConfiguracaoDto {
    update_automatico: boolean;
    tipo_ordenacao_padrao: number;
    intervalo_atualizacao: number;
    horario_comercial_atualizacao: boolean;
    usuario: IUsuario;
}
