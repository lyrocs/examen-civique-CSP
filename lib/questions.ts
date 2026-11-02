import { z } from 'zod'
import data from '@/data/questions.json'

export const ANSWERS_PER_QUESTION = 4

const QuestionSchema = z.object({
  id: z.number().int(),
  question: z.string().trim().min(1),
  answers: z.array(z.string().trim().min(1)).length(ANSWERS_PER_QUESTION),
  /** 0-based index into `answers` of the single correct answer. */
  correctAnswer: z
    .number()
    .int()
    .min(0)
    .max(ANSWERS_PER_QUESTION - 1),
})

const QuestionsFileSchema = z.object({
  questions: z
    .array(QuestionSchema)
    .min(1)
    .refine((list) => new Set(list.map((q) => q.id)).size === list.length, {
      message: 'question ids must be unique',
    }),
})

export type Question = z.infer<typeof QuestionSchema>

// Parsed at module load: a malformed data/questions.json fails `next build`
// instead of shipping a broken quiz.
export const questions: Question[] = QuestionsFileSchema.parse(data).questions
