import { Entidade } from "../../abstracoes/entidade";
import { Pacote } from "../../pacotes/entities/pacote.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class OperadorLogistico extends Entidade {
    @Column()
    documento: string;

    @Column()
    razao_social: string;

    @Column()
    nome_fantasia: string;

    @OneToMany(() => Pacote, (pacote) => pacote.operador_logistico, { cascade: true })
    pacotes: Pacote[];
}
