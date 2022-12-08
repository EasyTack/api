import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePacoteDto } from './dto/create-pacote.dto';
import { UpdatePacoteDto } from './dto/update-pacote.dto';
import { Pacote } from './entities/pacote.entity';
import { IPacote } from './interfaces/pacote.interface';
import { OperadorLogistico } from 'src/operadores-logisticos/entities/operador-logistico.entity';
import { OperadoresLogisticosService } from 'src/operadores-logisticos/operadores-logisticos.service';
import { RestRequestService } from 'src/rest-request/rest-request.service';

@Injectable()
export class PacotesService {
  private readonly nameof = 'Pacote';
  constructor(
    @InjectRepository(Pacote)
    private readonly repository: Repository<Pacote>,
    @InjectRepository(OperadorLogistico)
    private readonly operadorLogisticoRepository: Repository<OperadorLogistico>,
    private readonly restRequestService: RestRequestService
  ) { }

  public async create(dto: CreatePacoteDto): Promise<IPacote> {
    try {
      return await this.repository.save(dto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll(): Promise<Pacote[]> {
    return await this.repository.find();
  }

  public async findOne(id: string): Promise<Pacote> {
    const entity = await this.repository.findOneBy({ id: id });

    if (!entity)
      throw new NotFoundException(`${this.nameof} #${id} não encontrado`);

    return entity;
  }

  public async update(id: string, dto: UpdatePacoteDto): Promise<UpdateResult> {
    try {
      const entity = await this.repository.update({ id: id }, { ...dto });

      if (!entity)
        throw new NotFoundException(`${this.nameof} #${id} não existe`);

      return entity;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async remove(id: string) {
    const entity = await this.findOne(id);
    await this.repository.remove(entity);
  }

  public async getPacoteLogistica(operador_logistico_documento: string, codigo_pacote: string) {
    const operador_logistico = await this.operadorLogisticoRepository.findOneBy({ documento: operador_logistico_documento });
    let pacote = {};
    switch (operador_logistico.documento) {
      case '34028316000103':
        pacote = await this.restRequestService.getCorreios(codigo_pacote);
        break;
      default:
        break;
    }
    return { operador_logistico, pacote };
  }
}
