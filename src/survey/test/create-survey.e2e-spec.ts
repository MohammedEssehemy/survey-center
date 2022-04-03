import supertest from 'supertest';
import { Repository } from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { appInstancePromise } from '../../bootstrap';
import { Survey } from '../entities/survey.entity';

describe('create survey', () => {
  let app: INestApplication;
  let appUrl: string;
  const apiPath = '/survey';
  let surveyRepository: Repository<Survey>;
  beforeAll(async () => {
    app = await appInstancePromise;
    await app.listen(0);
    appUrl = await app.getUrl();
    surveyRepository = await app.get<Repository<Survey>>(
      getRepositoryToken(Survey),
    );
  });
  beforeEach(async () => {
    await surveyRepository.delete({});
  });

  it.each([
    //
    { params: { title: [] }, message: 'title must be a string' },
    {
      params: { questions: null },
      message:
        'questions.each value in nested property questions must be either object or array',
    },
    {
      params: { questions: [] },
      message: 'questions must contain at least 1 elements',
    },
  ])('should fail for wrong params $params', async ({ params, message }) => {
    const { body: response } = await supertest(appUrl)
      .post(apiPath)
      .send(params)
      .expect(422);
    expect(response.message.toString()).toContain(message);
  });

  it('should create survey successfully', async () => {
    const surveyDTO = {
      title: 'test-survey',
      questions: [
        {
          title: 'question 1',
          options: ['option 1', 'option 2'],
        },
      ],
    };
    const { body: createdSurvey } = await supertest(appUrl)
      .post(apiPath)
      .send(surveyDTO)
      .expect(201);
    expect(createdSurvey.id).toBeDefined();
    expect(createdSurvey.title).toEqual(surveyDTO.title);
    expect(createdSurvey.questions[0].title).toEqual(
      surveyDTO.questions[0].title,
    );
    expect(createdSurvey.questions[0].options).toEqual(
      surveyDTO.questions[0].options,
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
