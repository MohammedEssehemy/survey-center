import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSurveyDTO } from '../dto/create-survey.dto';
import { ListSurveyDTO } from '../dto/list-survey-dto';
import { Survey } from '../entities/survey.entity';

@Injectable()
export class SurveyService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}
  async create(surveyDTO: CreateSurveyDTO): Promise<Survey> {
    const survey = CreateSurveyDTO.toEntity(surveyDTO);
    await this.surveyRepository.save(survey);
    return survey;
  }

  async list(listSurveyDTO: ListSurveyDTO): Promise<Survey[]> {
    const surveys = await this.surveyRepository.find({
      relations: ['questions'],
      skip: listSurveyDTO.skip,
      take: listSurveyDTO.limit,
    });
    return surveys;
  }

  async getOne(surveyId: string): Promise<Survey> {
    return this.surveyRepository.findOne({
      where: { id: surveyId },
      relations: ['questions'],
    });
  }
}
