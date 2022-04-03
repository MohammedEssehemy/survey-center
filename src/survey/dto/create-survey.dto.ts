import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsString,
  ValidateNested,
} from 'class-validator';
import { SurveyQuestion } from '../entities/survey-question.entity';
import { Survey } from '../entities/survey.entity';

class SurveyQuestionDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  options: string[];

  static toEntity(dto: SurveyQuestionDTO): SurveyQuestion {
    const question = new SurveyQuestion();
    question.title = dto.title;
    question.options = dto.options;
    return question;
  }
}

export class CreateSurveyDTO {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ type: SurveyQuestionDTO, isArray: true })
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @Type(() => SurveyQuestionDTO)
  questions: SurveyQuestionDTO[];

  static toEntity(dto: CreateSurveyDTO): Survey {
    const survey = new Survey();
    survey.title = dto.title;
    survey.questions = dto.questions.map((q) => SurveyQuestionDTO.toEntity(q));
    return survey;
  }
}
