import { PartialType } from '@nestjs/mapped-types';
import { CreateOperadorLogisticoDto } from './create-operador-logistico.dto';

export class UpdateOperadorLogisticoDto extends PartialType(CreateOperadorLogisticoDto) {}
