import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Column, Entity, OneToOne } from "typeorm";
import { Entidade } from "../../abstracoes/entidade";

@Entity()
export class Configuracao extends Entidade {
    @Column()
    update_automatico: boolean;

    @Column()
    tipo_ordenacao_padrao: number;

    @Column()
    intervalo_atualizacao: number;

    @Column()
    horario_comercial_atualizacao: boolean;

    @OneToOne(() => Usuario)
    usuario: Usuario;
}
