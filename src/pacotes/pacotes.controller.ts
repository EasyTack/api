import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PacotesService } from './pacotes.service';
import { CreatePacoteDto } from './dto/create-pacote.dto';
import { UpdatePacoteDto } from './dto/update-pacote.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('pacotes')
@Controller('pacotes')
@UseGuards(AuthGuard('jwt'))
export class PacotesController {
  constructor(private readonly pacotesService: PacotesService) { }

  @Post()
  create(@Body() createPacoteDto: CreatePacoteDto) {
    return this.pacotesService.create(createPacoteDto);
  }

  @Get()
  findAll() {
    return this.pacotesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pacotesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePacoteDto: UpdatePacoteDto) {
    return this.pacotesService.update(id, updatePacoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pacotesService.remove(id);
  }

  @Get(':operador_logistico/:codigo_pacote')
  async getPacoteLogistica(@Param('operador_logistico') operador_logistico: string, @Param('codigo_pacote') codigo_pacote: string) {
    const operador_pacote = await this.pacotesService.getPacoteLogistica(codigo_pacote, operador_logistico);

    return operador_pacote;
  }
}
