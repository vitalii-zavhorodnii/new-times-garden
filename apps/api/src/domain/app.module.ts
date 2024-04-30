import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import configuration from '@config/configuration';

import { GardensModule } from '@domain/gardens/gardens.module';
import { PaymentsModule } from '@domain/payments/payments.module';
import { PlantsModule } from '@domain/plants/plants.module';
import { ProductsModule } from '@domain/products/products.module';
import { UsersModule } from '@domain/users/users.module';

// import { TelegramModule } from '@domain/telegram/telegram.module';
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
    GardensModule,
    UsersModule,
    PaymentsModule,
    ProductsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
