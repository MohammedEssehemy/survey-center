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
export class SurveyQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('varchar', { array: true })
  options: string[];

  @Index()
  @Column('uuid')
  surveyId: string;

  @ManyToOne(() => Survey, (survey) => survey.questions, {
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
