import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RegistroMovimentacoesService } from './registro-movimentacoes.service';
import { CreateRegistroMovimentacaoDto } from './dto/create-registro-movimentacao.dto';
import { UpdateRegistroMovimentacaoDto } from './dto/update-registro-movimentacao.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('registro-movimentacoes')
@Controller('registro-movimentacoes')
@UseGuards(AuthGuard('jwt'))
export class RegistroMovimentacoesController {
  constructor(
    private readonly registroMovimentacoesService: RegistroMovimentacoesService
  ) { }

  @Post()
  create(@Body() createRegistroMovimentacoeDto: CreateRegistroMovimentacaoDto) {
    return this.registroMovimentacoesService.create(
      createRegistroMovimentacoeDto
    );
  }

  @Get()
  findAll() {
    return this.registroMovimentacoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registroMovimentacoesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegistroMovimentacoeDto: UpdateRegistroMovimentacaoDto
  ) {
    return this.registroMovimentacoesService.update(
      id,
      updateRegistroMovimentacoeDto
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registroMovimentacoesService.remove(id);
  }
}
