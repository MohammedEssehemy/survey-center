import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { SurveySubmission } from '../entities/survey-submission.entity';

export class SurveySubmissionParamsDto {
  @IsUUID()
  @IsNotEmpty()
  surveyId: string;
}

export class SurveySubmissionBodyDto {
  @ApiProperty({ type: 'number', isArray: true })
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  answers: string[];

  static toEntity(dto: SurveySubmissionBodyDto): SurveySubmission {
    const submission = new SurveySubmission();
    submission.answers = dto.answers;
    return submission;
  }
}
