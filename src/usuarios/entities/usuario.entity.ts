import { Pessoa } from "../../abstracoes/pessoa";
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { Configuracao } from "../../configuracoes/entities/configuracao.entity";
import { Pacote } from "../../pacotes/entities/pacote.entity";

@Entity()
export class Usuario extends Pessoa {
    @Column({ unique: true })
    usuario: string;

    @Column({ unique: true })
    email: string;

    @Column({ length: 60 })
    senha: string;

    @OneToOne(() => Configuracao)
    @JoinColumn()
    configuracao: Configuracao;

    @OneToMany(() => Pacote, (pacote) => pacote.usuario)
    pacotes: Pacote[];
}
