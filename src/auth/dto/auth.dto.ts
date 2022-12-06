import { PartialType } from "@nestjs/swagger";
import { UsuarioDto } from "../../usuarios/dto/usuario.dto";


export class AuthDto extends PartialType(UsuarioDto) { }