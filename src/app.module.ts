import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import chalk from 'chalk';
import { env } from 'config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

console.log(
  `${chalk.bgBlueBright(' Ready to connect ')} 当前环境为 ${chalk.redBright(
    process.env.NODE_ENV,
  )}`,
);

@Module({
  imports: [TypeOrmModule.forRoot(env.DATABASE_CONFIG), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
