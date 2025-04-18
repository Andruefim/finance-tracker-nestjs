import { IsEmail, IsNotEmpty } from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    username: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class SignInDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class ConfirmEmailDto {
    @IsNotEmpty()
    code: string;
}