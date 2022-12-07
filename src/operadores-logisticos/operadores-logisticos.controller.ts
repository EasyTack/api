import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperadoresLogisticosService } from './operadores-logisticos.service';
import { CreateOperadorLogisticoDto } from './dto/create-operador-logistico.dto';
import { UpdateOperadorLogisticoDto } from './dto/update-operador-logistico.dto';

@ApiTags('operadores-logisticos')
@Controller('operadores-logisticos')
export class OperadoresLogisticosController {
  constructor(
    private readonly operadoresLogisticosService: OperadoresLogisticosService
  ) { }

  @Post()
  create(@Body() createOperadoresLogisticosDto: CreateOperadorLogisticoDto) {
    return this.operadoresLogisticosService.create(
      createOperadoresLogisticosDto
    );
  }

  @Get()
  findAll() {
    return this.operadoresLogisticosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.operadoresLogisticosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOperadoresLogisticosDto: UpdateOperadorLogisticoDto
  ) {
    return this.operadoresLogisticosService.update(id, updateOperadoresLogisticosDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.operadoresLogisticosService.remove(id);
  }
}
