import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1649014468009 implements MigrationInterface {
  name = 'initialMigration1649014468009';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "survey" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f0da32b9181e9c02ecf0be11ed3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "survey_question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "options" character varying array NOT NULL, "surveyId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ec6d65e83fd7217202178b79907" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_036a359b4a0884d113f6232e96" ON "survey_question" ("surveyId") `,
    );
    await queryRunner.query(
      `CREATE TABLE "survey_submission" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "answers" character varying array NOT NULL, "surveyId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_83b4660703cf030a6ac1c209a1b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31fd2c7c2672667b2d7376ea3a" ON "survey_submission" ("surveyId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "survey_question" ADD CONSTRAINT "FK_036a359b4a0884d113f6232e96d" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey_submission" ADD CONSTRAINT "FK_31fd2c7c2672667b2d7376ea3a7" FOREIGN KEY ("surveyId") REFERENCES "survey"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "survey_submission" DROP CONSTRAINT "FK_31fd2c7c2672667b2d7376ea3a7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "survey_question" DROP CONSTRAINT "FK_036a359b4a0884d113f6232e96d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31fd2c7c2672667b2d7376ea3a"`,
    );
    await queryRunner.query(`DROP TABLE "survey_submission"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_036a359b4a0884d113f6232e96"`,
    );
    await queryRunner.query(`DROP TABLE "survey_question"`);
    await queryRunner.query(`DROP TABLE "survey"`);
  }
}
