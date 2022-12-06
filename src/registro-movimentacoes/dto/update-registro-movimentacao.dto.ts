import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroMovimentacaoDto } from './create-registro-movimentacao.dto';

export class UpdateRegistroMovimentacaoDto extends PartialType(CreateRegistroMovimentacaoDto) {}
