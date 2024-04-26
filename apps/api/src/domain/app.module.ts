import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import configuration from '@config/configuration';

import { GardensModule } from './gardens/gardens.module';
import { PlantsModule } from '@domain/plants/plants.module';

import { STATIC_FOLDER } from '@constants/routes.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.production'],
      isGlobal: true,
      load: [configuration]
    }),
    ServeStaticModule.forRoot({
      rootPath: `${process.cwd()}/${STATIC_FOLDER}`
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database.link'),
        dbName: config.get<string>('database.dbname')
      })
    }),
    PlantsModule,
    GardensModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
