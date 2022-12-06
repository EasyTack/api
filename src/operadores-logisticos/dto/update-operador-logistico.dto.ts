import { PartialType } from '@nestjs/swagger';
import { CreateOperadorLogisticoDto } from './create-operador-logistico.dto';

export class UpdateOperadorLogisticoDto extends PartialType(CreateOperadorLogisticoDto) {}
