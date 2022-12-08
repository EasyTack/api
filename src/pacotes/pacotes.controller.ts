import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PacotesService } from './pacotes.service';
import { CreatePacoteDto } from './dto/create-pacote.dto';
import { UpdatePacoteDto } from './dto/update-pacote.dto';
import { AuthGuard } from '@nestjs/passport';
import { FactoriesService } from 'src/factories/factories.service';
import { RegistroMovimentacoesService } from 'src/registro-movimentacoes/registro-movimentacoes.service';
@ApiTags('pacotes')
@Controller('pacotes')
@UseGuards(AuthGuard('jwt'))
export class PacotesController {
  constructor(
    private readonly pacotesService: PacotesService,
    private readonly factoriesServices: FactoriesService,
    private readonly registroMovimentacoesService: RegistroMovimentacoesService
  ) { }

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
    const operador_movimentacoes = await this.pacotesService.getPacoteLogistica(operador_logistico, codigo_pacote);
    let registroMovimentacoes = [];
    switch (operador_movimentacoes.operador_logistico.documento) {
      case '34028316000103':
        registroMovimentacoes = this.factoriesServices.correios(operador_movimentacoes.pacoteMovimentacoes);
        break;
      default:
        break;
    }
    const registroMovimentacoesDb = [];
    for (const registro of registroMovimentacoes)
      registroMovimentacoesDb.push(await this.registroMovimentacoesService.create(registro));
    const pacote = {
      data_postagem: "",
      data_entrega: "",
      codigo_operador_logistico: codigo_pacote,
      local_origem: "",
      local_destino: "",
      status: "",
      movimentacoes: registroMovimentacoesDb,
      etiquetas: [],
      usuario: {},
      operador_logistico: operador_movimentacoes.operador_logistico
    };
    return pacote;
  }
}
