import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
    saltOrRounds: number = 10;
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async signIn(email: string, pass: string): Promise<any> {
        const user = await this.usersRepository.findOneBy({ email });
        const isMatch = await bcrypt.compare(pass, user!.password);

        if (!user || !isMatch) throw new UnauthorizedException();

        const payload = {
            sub: user!.userId,
            username: user.userName,
            email: user.email
        }

        return {
            access_token: await this.jwtService.signAsync(payload),
        }
    }

    async signUp(payload: RegisterDto) {
        const hashPass = await bcrypt.hash(payload.password, this.saltOrRounds);

        let data = {
            ...payload,
            password: hashPass
        }

        const user = await this.usersRepository.create(data);
        return user;
    }
}
