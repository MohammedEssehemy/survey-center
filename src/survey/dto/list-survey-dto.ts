import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class ListSurveyDTO {
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
