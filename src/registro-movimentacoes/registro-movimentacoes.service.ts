import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRegistroMovimentacaoDto } from './dto/create-registro-movimentacao.dto';
import { UpdateRegistroMovimentacaoDto } from './dto/update-registro-movimentacao.dto';
import { RegistroMovimentacao } from './entities/registro-movimentacao.entity';
import { IRegistroMovimentacao } from './interfaces/registro-movimentacao.interface';

@Injectable()
export class RegistroMovimentacoesService {
  private readonly nameof = 'RegistroMovimentacao';
  constructor(
    @InjectRepository(RegistroMovimentacao)
    private readonly repository: Repository<RegistroMovimentacao>,
  ) {}

  public async create(
    dto: CreateRegistroMovimentacaoDto,
  ): Promise<IRegistroMovimentacao> {
    try {
      return await this.repository.save(dto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll(): Promise<RegistroMovimentacao[]> {
    return await this.repository.find();
  }

  public async findOne(id: string): Promise<RegistroMovimentacao> {
    const entity = await this.repository.findOneBy({ id: id });

    if (!entity)
      throw new NotFoundException(`${this.nameof} #${id} não encontrado`);

    return entity;
  }

  public async update(
    id: string,
    dto: UpdateRegistroMovimentacaoDto,
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
}
