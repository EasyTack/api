import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { PacotesService } from './pacotes.service';
import { CreatePacoteDto } from './dto/create-pacote.dto';
import { UpdatePacoteDto } from './dto/update-pacote.dto';
import { AuthGuard } from '@nestjs/passport';
import { FactoriesService } from './../factories/factories.service';
import { RegistroMovimentacoesService } from 'src/registro-movimentacoes/registro-movimentacoes.service';
import { UtilsService } from './../utils/utils.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Request } from 'express';
@ApiTags('pacotes')
@Controller('pacotes')
@UseGuards(AuthGuard('jwt'))
export class PacotesController {
  constructor(
    private readonly pacotesService: PacotesService,
    private readonly factoriesServices: FactoriesService,
    private readonly registroMovimentacoesService: RegistroMovimentacoesService,
    private readonly utilsService: UtilsService,
    private readonly usuariosService: UsuariosService
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
  async getPacoteLogistica(@Req() request: Request, @Param('operador_logistico') operador_logistico: string, @Param('codigo_pacote') codigo_pacote: string) {
    const operador_movimentacoes = await this.pacotesService.getPacoteLogistica(operador_logistico, codigo_pacote);
    let registroMovimentacoes = [];
    switch (operador_movimentacoes.operador_logistico.documento) {
      case '34028316000103':
        registroMovimentacoes = this.factoriesServices.correios(operador_movimentacoes.pacoteMovimentacoes);
        break;
      default:
        break;
    }
    const idUsuario = this.utilsService.decode(request.headers['authorization'].replace('Bearer ', '').replace('bearer ', ''));
    const usuario = await this.usuariosService.findOne(idUsuario);

    return this.pacotesService.create({
      data_postagem: new Date(0),
      data_entrega: new Date(0),
      codigo_operador_logistico: codigo_pacote,
      local_origem: "",
      local_destino: "",
      status: "",
      movimentacoes: registroMovimentacoes,
      etiquetas: [],
      usuario: usuario,
      operador_logistico: operador_movimentacoes.operador_logistico
    });
  }
  @Get('user')
  async findByUsuario(@Req() request: Request) {
    //nao consegui fazer funcionar
    console.log(request)
    const idUsuario = this.utilsService.decode(request.headers['authorization'].replace('Bearer ', '').replace('bearer ', ''));
    return await this.usuariosService.findWithRelations(idUsuario);
  }

}
