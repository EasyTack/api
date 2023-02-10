import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IOperadorLogistico } from './interfaces/operador-logistico.interface';
import { OperadorLogistico } from './entities/operador-logistico.entity';
import { CreateOperadorLogisticoDto } from './dto/create-operador-logistico.dto';
import { UpdateOperadorLogisticoDto } from './dto/update-operador-logistico.dto';

@Injectable()
export class OperadoresLogisticosService {
  private readonly nameof = 'OperadorLogistico';
  constructor(
    @InjectRepository(OperadorLogistico)
    private readonly repository: Repository<OperadorLogistico>,
  ) {}

  public async create(
    dto: CreateOperadorLogisticoDto,
  ): Promise<IOperadorLogistico> {
    try {
      return await this.repository.save(dto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll(): Promise<OperadorLogistico[]> {
    return await this.repository.find();
  }

  public async findOne(id: string): Promise<OperadorLogistico> {
    const entity = await this.repository.findOneBy({ id: id });

    if (!entity)
      throw new NotFoundException(`${this.nameof} #${id} não encontrado`);

    return entity;
  }

  public async update(
    id: string,
    dto: UpdateOperadorLogisticoDto,
  ): Promise<UpdateResult> {
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

  public async find(query: string): Promise<IOperadorLogistico> {
    const entity = await this.repository.query(query);
    return entity;
  }
}
