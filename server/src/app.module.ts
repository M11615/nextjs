import * as path from 'path';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { I18nModule, I18nJsonLoader, QueryResolver, HeaderResolver, CookieResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { Subscription, SubscriptionSchema } from './subscription/schemas/subscription.schema';
import { SubscriptionService } from './subscription/subscription.service';
import { SubscriptionController } from './subscription/subscription.controller';
import { GenerateService } from './generate/generate.service';
import { GenerateController } from './generate/generate.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}.local`,
      isGlobal: true
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'en-UK',
      loaderOptions: {
        path: path.join(__dirname, '/i18n'),
        includeSubfolders: true
      },
      loader: I18nJsonLoader,
      resolvers: [
        new QueryResolver(['lang', 'l']),
        new HeaderResolver(['x-custom-lang', 'x-i18next-current-language']),
        new CookieResolver(['i18next']),
        AcceptLanguageResolver
      ]
    }),
    ...process.env.ENABLE_MONGO === 'true' ? [
      MongooseModule.forRoot(process.env.MONGO_URL ?? 'mongodb://localhost:27017/nextjs'),
      MongooseModule.forFeature([{ name: Subscription.name, schema: SubscriptionSchema }])
    ] : []
  ],
  providers: [
    AppService,
    GenerateService,
    ...process.env.ENABLE_MONGO === 'true' ? [
      SubscriptionService
    ] : []
  ],
  controllers: [
    AppController,
    GenerateController,
    ...process.env.ENABLE_MONGO === 'true' ? [
      SubscriptionController
    ] : []
  ]
})
export class AppModule { }
