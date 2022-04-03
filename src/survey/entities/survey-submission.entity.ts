import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Survey } from './survey.entity';

@Entity()
export class SurveySubmission {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { array: true })
  answers: string[];

  @Index()
  @Column('uuid')
  surveyId: string;

  @ManyToOne(() => Survey, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  survey: Survey;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
