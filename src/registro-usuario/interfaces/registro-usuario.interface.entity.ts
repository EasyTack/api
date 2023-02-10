import { IPessoa } from '../../abstracoes/interface/ipessoa';

export interface IRegistroUsuario extends IPessoa {
  readonly usuario: string;
  readonly email: string;
  readonly senha: string;
}
