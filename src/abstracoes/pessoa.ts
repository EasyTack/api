import { Column } from 'typeorm';
import { Entidade } from './entidade';

export abstract class Pessoa extends Entidade {
    @Column()
    nome: string;

    @Column()
    sobrenome: string;

    @Column()
    documento: string;
}
