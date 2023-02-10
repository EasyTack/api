import {
  Controller,
  Post,
  Body,
  Req,
  BadRequestException,
  Get,
  HttpCode,
  Param,
} from '@nestjs/common';
import { Request } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { OperadoresLogisticosService } from 'src/operadores-logisticos/operadores-logisticos.service';
import { ReceiveSparqlDto } from './dto/receive-sparql.dto';
import { SparqlService } from './sparql.service';

@ApiTags('sparql')
@Controller('sparql')
export class SparqlController {
  constructor(
    private readonly sparqlService: SparqlService,
    private readonly operadoresLogisticosService: OperadoresLogisticosService,
  ) { }

  @Post('/')
  @HttpCode(200)
  async operadoresLogisticos(
    @Body() receiveSparqlDto: ReceiveSparqlDto,
    @Req() req: Request,
  ) {
    const tables = ['operadorLogistico'];
    if (!tables.includes(receiveSparqlDto.subject))
      throw new BadRequestException('Sujeito não aceito');

    const uri = this.sparqlService.getUri(req);
    const turtleQuery = this.sparqlService.toTurtle(receiveSparqlDto);
    const sqlQuery = this.sparqlService.toSql(turtleQuery);
    try {
      const result = await this.operadoresLogisticosService.find(sqlQuery);
      return this.sparqlService.toTriple(turtleQuery, receiveSparqlDto.iri, result[0]);
    } catch (error) {
      throw new BadRequestException(`Erro ao executar query \n ${error}`);
    }
  }

  @Get('/ontology/:resource')
  getResource(@Param('resource') resource: string, @Req() req: Request) {
    const uri = this.sparqlService.getUri(req);
    return this.sparqlService.getResource(resource, uri);
  }
}
