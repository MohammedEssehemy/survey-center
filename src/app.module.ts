import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '../ormconfig';
import { SurveyModule } from './survey/survey.module';

@Module({
  imports: [
    //
    TypeOrmModule.forRoot({
      ...dbConfig,
    }),
    SurveyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
