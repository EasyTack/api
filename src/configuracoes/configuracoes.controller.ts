import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ConfiguracoesService } from './configuracoes.service';
import { CreateConfiguracaoDto } from './dto/create-configuracao.dto';
import { UpdateConfiguracaoDto } from './dto/update-configuracao.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('configuracoes')
@Controller('configuracoes')
@UseGuards(AuthGuard('jwt'))
export class ConfiguracoesController {
  constructor(private readonly configuracoesService: ConfiguracoesService) {}

  @Post()
  create(@Body() createConfiguracoeDto: CreateConfiguracaoDto) {
    return this.configuracoesService.create(createConfiguracoeDto);
  }

  @Get()
  findAll() {
    return this.configuracoesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.configuracoesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConfiguracoeDto: UpdateConfiguracaoDto,
  ) {
    return this.configuracoesService.update(id, updateConfiguracoeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.configuracoesService.remove(id);
  }
}
