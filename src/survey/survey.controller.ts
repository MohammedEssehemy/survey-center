import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  SurveySubmissionBodyDto,
  SurveySubmissionParamsDto,
} from './dto/create-survey-submission.dto';
import { CreateSurveyDTO } from './dto/create-survey.dto';
import { FindOneSurveyParams } from './dto/find-one-survey-params.dto';
import {
  GetSurveySubmissionsParamsDto,
  GetSurveySubmissionsQueryDTO,
} from './dto/get-survey-submissions.dto';
import { ListSurveyDTO } from './dto/list-survey-dto';
import { SurveySubmissionResponseDTO } from './dto/survery-submission-response.dto';
import { SurveyResponseDTO } from './dto/survey-response.dto';
import { SurveyNotFound } from './errors/survey.errors';
import { SubmissionService } from './services/submission.service';
import { SurveyService } from './services/survey.service';

@ApiTags('survey')
@Controller({ path: 'survey', version: VERSION_NEUTRAL })
export class SurveyController {
  constructor(
    //
    private readonly surveyService: SurveyService,
    private readonly submissionService: SubmissionService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'create survey',
    operationId: 'createSurvey',
  })
  @ApiCreatedResponse({
    description: 'The survey has been created successfully',
    type: SurveyResponseDTO,
  })
  async createSurvey(
    @Body() createSurveyDTO: CreateSurveyDTO,
  ): Promise<SurveyResponseDTO> {
    const survey = await this.surveyService.create(createSurveyDTO);
    return SurveyResponseDTO.fromEntity(survey);
  }

  @Get()
  @ApiOperation({
    summary: 'list of surveys survey',
    operationId: 'listSurveys',
  })
  @ApiOkResponse({
    description: 'The surveys in the system',
    type: [SurveyResponseDTO],
  })
  async listSurveys(
    @Query() listSurveyDTO: ListSurveyDTO,
  ): Promise<SurveyResponseDTO[]> {
    const surveys = await this.surveyService.list(listSurveyDTO);
    return surveys.map((s) => SurveyResponseDTO.fromEntity(s));
  }

  @Get('/:surveyId')
  @ApiOperation({
    summary: 'get surveys by id',
    operationId: 'findSurveyById',
  })
  @ApiOkResponse({
    description: 'survey',
    type: SurveyResponseDTO,
  })
  @ApiParam({
    name: 'surveyId',
  })
  async getSurvey(
    @Param() params: FindOneSurveyParams,
  ): Promise<SurveyResponseDTO> {
    const survey = await this.surveyService.getOne(params.surveyId);
    if (!survey) {
      throw new SurveyNotFound();
    }
    return SurveyResponseDTO.fromEntity(survey);
  }

  @Post('/:surveyId/submit')
  @ApiOperation({
    summary: 'submit answers for survey',
    operationId: 'submitSurveyById',
  })
  @ApiOkResponse({
    description: 'Submission',
    type: SurveySubmissionResponseDTO,
  })
  @ApiParam({
    name: 'surveyId',
  })
  async submitSurvey(
    @Param() params: SurveySubmissionParamsDto,
    @Body() surveySubmissionBodyDTO: SurveySubmissionBodyDto,
  ): Promise<SurveySubmissionResponseDTO> {
    const survey = await this.surveyService.getOne(params.surveyId);
    if (!survey) {
      throw new SurveyNotFound();
    }
    const surveySubmission = await this.submissionService.submitSurvey(
      survey,
      surveySubmissionBodyDTO,
    );
    return SurveySubmissionResponseDTO.fromEntity(surveySubmission);
  }

  @Get('/:surveyId/submissions')
  @ApiOperation({
    summary: 'submissions for survey',
    operationId: 'submissionsForSurvey',
  })
  @ApiOkResponse({
    description: 'Submissions',
    type: [SurveySubmissionResponseDTO],
  })
  @ApiParam({
    name: 'surveyId',
  })
  async getSurveySubmissions(
    @Param() params: GetSurveySubmissionsParamsDto,
    @Query() query: GetSurveySubmissionsQueryDTO,
  ): Promise<SurveySubmissionResponseDTO[]> {
    const survey = await this.surveyService.getOne(params.surveyId);
    if (!survey) {
      throw new SurveyNotFound();
    }

    const surveySubmissions = await this.submissionService.getSurveySubmissions(
      survey.id,
      query,
    );

    return surveySubmissions.map((s) =>
      SurveySubmissionResponseDTO.fromEntity(s),
    );
  }
}
