import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { getMetadataArgsStorage } from 'typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../ormconfig');

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ...config,
      entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
    }),
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
