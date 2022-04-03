import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveyQuestion } from './entities/survey-question.entity';
import { SurveySubmission } from './entities/survey-submission.entity';
import { Survey } from './entities/survey.entity';
import { SurveyController } from './survey.controller';
import { SurveyService } from './services/survey.service';
import { SubmissionService } from './services/submission.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Survey, SurveyQuestion, SurveySubmission]),
  ],
  controllers: [SurveyController],
  providers: [SurveyService, SubmissionService],
})
export class SurveyModule {}
