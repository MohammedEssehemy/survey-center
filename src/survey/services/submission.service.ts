import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveySubmissionBodyDto } from '../dto/create-survey-submission.dto';
import { GetSurveySubmissionsQueryDTO } from '../dto/get-survey-submissions.dto';
import { SurveySubmission } from '../entities/survey-submission.entity';
import { Survey } from '../entities/survey.entity';
import {
  InvalidAnswerForQuestion,
  MissingAnswerForQuestion,
} from '../errors/survey.errors';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(SurveySubmission)
    private readonly surveySubmissionRepository: Repository<SurveySubmission>,
  ) {}

  validateSurveyAnswers(survey: Survey, answers: string[]): string[] {
    return survey.questions.map((q, i) => {
      const answer = answers[i];
      if (!answer) throw new MissingAnswerForQuestion(q.title, q.options);
      if (!q.options.includes(answer))
        throw new InvalidAnswerForQuestion(q.title, answer, q.options);
      return answer;
    });
  }

  async submitSurvey(
    survey: Survey,
    submission: SurveySubmissionBodyDto,
  ): Promise<SurveySubmission> {
    const surveySubmission = SurveySubmissionBodyDto.toEntity(submission);
    surveySubmission.survey = survey;
    surveySubmission.answers = this.validateSurveyAnswers(
      survey,
      submission.answers,
    );
    await this.surveySubmissionRepository.save(surveySubmission);
    return surveySubmission;
  }

  async getSurveySubmissions(
    surveyId: string,
    pagination: GetSurveySubmissionsQueryDTO,
  ): Promise<SurveySubmission[]> {
    const submissions = await this.surveySubmissionRepository.find({
      where: { surveyId },
      skip: pagination.skip,
      take: pagination.limit,
    });
    return submissions;
  }
}
