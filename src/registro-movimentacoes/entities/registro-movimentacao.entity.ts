import { Entidade } from "../../abstracoes/entidade";
import { Column, Entity, ManyToOne } from "typeorm";
import { Pacote } from "../../pacotes/entities/pacote.entity";

@Entity()
export class RegistroMovimentacao extends Entidade {
    @Column()
    data_movimentacao?: Date;

    @Column()
    local_origem: string;

    @Column()
    local_destino: string;

    @Column()
    status: string;

    @Column({ type: 'jsonb' })
    response: object;

    @ManyToOne(() => Pacote, (pacote) => pacote.movimentacoes)
    pacote: Pacote;
}
