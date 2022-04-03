import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../ormconfig';
import { appController } from './app.controller';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    //
    TypeOrmModule.forRoot({
      ...dbConfig,
    }),
    SurveyModule,
  ],
  controllers: [appController],
  providers: [],
})
export class AppModule {}
