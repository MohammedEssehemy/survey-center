import { ApiProperty } from '@nestjs/swagger';
import { SurveySubmission } from '../entities/survey-submission.entity';

export class SurveySubmissionResponseDTO {
  @ApiProperty()
  id: string;
  @ApiProperty()
  answers: string[];
  @ApiProperty()
  surveyId: string;

  static fromEntity(entity: SurveySubmission): SurveySubmissionResponseDTO {
    const dto = new SurveySubmissionResponseDTO();
    dto.id = entity.id;
    dto.answers = entity.answers;
    dto.surveyId = entity.surveyId;
    return dto;
  }
}
