import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { SurveyQuestion } from '../entities/survey-question.entity';
import { Survey } from '../entities/survey.entity';

class SurveyQuestionResponseDTO {
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString({ each: true })
  options: string[];

  static fromEntity(entity: SurveyQuestion): SurveyQuestionResponseDTO {
    const dto = new SurveyQuestionResponseDTO();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.options = entity.options;
    return dto;
  }
}
export class SurveyResponseDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty({ type: SurveyQuestionResponseDTO, isArray: true })
  @Type(() => SurveyQuestionResponseDTO)
  questions: SurveyQuestionResponseDTO[];

  static fromEntity(entity: Survey): SurveyResponseDTO {
    const dto = new SurveyResponseDTO();
    dto.id = entity.id;
    dto.title = entity.title;
    dto.questions = entity.questions.map((q) =>
      SurveyQuestionResponseDTO.fromEntity(q),
    );

    return dto;
  }
}
