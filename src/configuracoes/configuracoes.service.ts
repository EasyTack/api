import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateConfiguracaoDto } from './dto/create-configuracao.dto';
import { UpdateConfiguracaoDto } from './dto/update-configuracao.dto';
import { Configuracao } from './entities/configuracao.entity';
import { IConfiguracao } from './interfaces/configuracao.interface';

@Injectable()
export class ConfiguracoesService {
  private readonly nameof = 'Configuracao';
  constructor(
    @InjectRepository(Configuracao)
    private readonly repository: Repository<Configuracao>
  ) { }

  public async create(dto: CreateConfiguracaoDto): Promise<IConfiguracao> {
    try {
      return await this.repository.save(dto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll(): Promise<Configuracao[]> {
    return await this.repository.find();
  }

  public async findOne(id: string): Promise<Configuracao> {
    const entity = await this.repository.findOneBy({ id: id });

    if (!entity)
      throw new NotFoundException(`${this.nameof} #${id} não encontrado`);

    return entity;
  }

  public async update(
    id: string,
    dto: UpdateConfiguracaoDto
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
