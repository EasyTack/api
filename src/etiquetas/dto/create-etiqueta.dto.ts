import { IPacote } from 'src/pacotes/interfaces/pacote.interface';

export class CreateEtiquetaDto {
  nome: string;
  cor: string;
  codigo: string;
  pacote: IPacote;
}
