import { Question, Answer } from "@/types";

export interface AnswerWithStats extends Pick<Answer, "text"> {
  /**
   * This property corresponds to PR(a) described in the README, expressed as a
   * fraction.
   */
  PRa: number;

  /**
   * This property corresponds to PRF(a) described in the README, expressed as a
   * fraction.
   */
  PRFa: number;
}

export interface QuestionWithStats
  extends Pick<Question, "title" | "question_type"> {
  answers: AnswerWithStats[];
}
