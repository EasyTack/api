import { PartialType } from '@nestjs/swagger';
import { CreateRegistroMovimentacaoDto } from './create-registro-movimentacao.dto';

export class UpdateRegistroMovimentacaoDto extends PartialType(
  CreateRegistroMovimentacaoDto,
) {}
