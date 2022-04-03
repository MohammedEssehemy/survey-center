import { HttpException, HttpStatus } from '@nestjs/common';

export class SurveyNotFound extends HttpException {
  name = 'SURVEY.NOT_FOUND';

  constructor() {
    super('Survey not found', HttpStatus.NOT_FOUND);
  }
}

export class InvalidAnswerForQuestion extends HttpException {
  name = 'SURVEY.INVALID_ANSWER';

  constructor(question: string, answer: string, options: string[]) {
    super(
      `Invalid answer "${answer}" for question "${question}", allowed options: ${options
        .map((o) => `"${o}"`)
        .join(',')}`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}

export class MissingAnswerForQuestion extends HttpException {
  name = 'SURVEY.Missing_ANSWER';

  constructor(question: string, options: string[]) {
    super(
      `Missing answer for question ${question}, allowed options: ${options
        .map((o) => `"${o}"`)
        .join(', ')}`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
