import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { IUsuario } from './interfaces/usuario.interface';

@Injectable()
export class UsuariosService {
  private readonly nameof = 'Usuario';
  constructor(
    @InjectRepository(Usuario)
    private readonly repository: Repository<Usuario>,
  ) {}

  public async create(dto: CreateUsuarioDto): Promise<IUsuario> {
    try {
      return await this.repository.save(dto);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async findAll(): Promise<Usuario[]> {
    return await this.repository.find();
  }

  public async findOne(id: string): Promise<Usuario> {
    const entity = await this.repository.findOneBy({ id: id });

    if (!entity)
      throw new NotFoundException(`${this.nameof} #${id} não encontrado`);

    return entity;
  }

  public async update(
    id: string,
    dto: UpdateUsuarioDto,
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

  public async findByEmail(email: string): Promise<Usuario> {
    const usuario = await this.repository.findOne({
      where: {
        email: email,
      },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario ${email} não encontrado`);
    }

    return usuario;
  }

  public async findByUser(usuario: string): Promise<Usuario> {
    const usuarioDb = await this.repository.findOne({
      where: {
        usuario: usuario,
      },
    });

    if (!usuarioDb) {
      throw new NotFoundException(`Usuario ${usuario} não encontrado`);
    }

    return usuarioDb;
  }

  public async findWithRelations(id: string) {
    console.log(id, 'ooi');
    const entity = await this.repository.findOne({
      where: { usuario: id },
      loadEagerRelations: true,
    });

    if (!entity)
      throw new NotFoundException(`${this.nameof} #${id} não encontrado`);

    return entity;
  }
}
