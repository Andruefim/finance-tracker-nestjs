import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { User } from './modules/users/user.entity';
import { UsersModule } from './modules/users/users.module';
import { Transaction } from './modules/transactions/transaction.entity';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from './modules/email/email.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { TransactionsChartsModule } from './modules/transactions-charts/transactions-charts.module';
import { Category } from './modules/categories/category.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [User, Transaction, Category],
            synchronize: true,
            autoLoadEntities: true,
            logging: true,
        }),
        TransactionsModule,
        UsersModule,
        AuthModule,
        EmailModule,
        CategoriesModule,
        TransactionsChartsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('app')
    }
}
