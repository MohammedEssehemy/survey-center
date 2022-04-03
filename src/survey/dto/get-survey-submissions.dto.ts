import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class GetSurveySubmissionsParamsDto {
  @IsUUID()
  @IsNotEmpty()
  surveyId: string;
}

export class GetSurveySubmissionsQueryDTO {
  @ApiProperty({ required: false, default: 10 })
  @Max(100)
  @Min(1)
  @IsInt()
  @IsOptional()
  limit: number = 10;

  @ApiProperty({ required: false, default: 0 })
  @Min(0)
  @IsInt()
  @IsOptional()
  skip: number = 0;
}
