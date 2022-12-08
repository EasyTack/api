import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { Etiqueta } from "../../etiquetas/entities/etiqueta.entity";
import { Entidade } from "../../abstracoes/entidade";
import { RegistroMovimentacao } from "../../registro-movimentacoes/entities/registro-movimentacao.entity";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { OperadorLogistico } from "../../operadores-logisticos/entities/operador-logistico.entity";

@Entity()
export class Pacote extends Entidade {
    @Column()
    data_postagem?: Date;

    @Column()
    data_entrega?: Date;

    @Column()
    codigo_operador_logistico: string;

    @Column()
    local_origem?: string;

    @Column()
    local_destino?: string;

    @Column()
    status?: string;

    @OneToMany(() => RegistroMovimentacao, (movimentacoes) => movimentacoes.pacote, { cascade: true })
    movimentacoes: RegistroMovimentacao[];

    @OneToMany(() => Etiqueta, (etiqueta) => etiqueta.pacote, { cascade: true })
    etiquetas: Etiqueta[];

    @ManyToOne(() => Usuario, (usuario) => usuario.pacotes)
    usuario: Usuario;

    @ManyToOne(() => OperadorLogistico, (operador_logistico) => operador_logistico.pacotes)
    operador_logistico: OperadorLogistico;
}
