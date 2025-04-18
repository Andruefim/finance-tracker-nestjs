import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ userId: id });
    }

    async update(id: string, updateUserDto: { emailConfirmationCode: User['emailConfirmationCode'] }): Promise<User | null> {
        await this.usersRepository.update(id, updateUserDto);

        return this.usersRepository.findOneBy({ userId: id })
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
