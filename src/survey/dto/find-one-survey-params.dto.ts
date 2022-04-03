import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneSurveyParams {
  @IsUUID()
  @IsNotEmpty()
  surveyId: string;
}
