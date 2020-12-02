import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(private jwtService: JwtService) {
  }

  async generateJwt({ username, id, createdAt }): Promise<string> {
    return this.jwtService.signAsync({ username, id, createdAt });
  }

  async comparePasswords(inputPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(inputPassword, hashedPassword);
  }


}
