import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { getMetadataArgsStorage } from 'typeorm';
import { EventsModule } from './events/events.module';
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
    EventsModule,
  ],
})
export class AppModule {}
