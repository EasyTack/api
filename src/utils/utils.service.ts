import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class UtilsService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  public generatePassword() {
    return crypto.randomUUID();
  }

  public decode(token) {
    const obj = this.jwtService.decode(token)
    return obj['id'];
  }
}