'use client'

import { useEffect, useState } from 'react'
import type { Question } from '@/lib/questions'
import s from './Quiz.module.css'

const LETTERS = ['A', 'B', 'C', 'D']
const QUESTIONS_PER_QUIZ = 40

// Partial Fisher–Yates: uniform random sample of `count` questions without repeats.
function pickRandom(pool: Question[], count: number): Question[] {
  const copy = pool.slice()
  const n = Math.min(count, copy.length)
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(Math.random() * (copy.length - i))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy.slice(0, n)
}

type Props = { pool: Question[] }

export function Quiz({ pool }: Props) {
  // Drawn after mount: sampling during render would differ between server and client and break hydration.
  const [questions, setQuestions] = useState<Question[] | null>(null)
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    setQuestions(pickRandom(pool, QUESTIONS_PER_QUIZ))
  }, [pool])

  if (questions === null) return <section className={s.card} aria-busy="true" />

  const total = questions.length

  function restart() {
    setQuestions(pickRandom(pool, QUESTIONS_PER_QUIZ))
    setIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const percent = Math.round((score / total) * 100)
    return (
      <section className={s.card} aria-live="polite">
        <p className={s.eyebrow}>Résultat</p>
        <p className={s.score}>
          {score}
          <span className={s.scoreTotal}> / {total}</span>
        </p>
        <p className={s.percent}>{percent} % de bonnes réponses</p>
        <div className={s.actions}>
          <button type="button" className={s.primary} onClick={restart}>
            Recommencer
          </button>
        </div>
      </section>
    )
  }

  const current = questions[index]
  const answered = selected !== null
  const isLast = index === total - 1

  function choose(answerIndex: number) {
    if (answered) return
    setSelected(answerIndex)
    if (answerIndex === current.correctAnswer) setScore((n) => n + 1)
  }

  function next() {
    if (isLast) {
      setFinished(true)
      return
    }
    setIndex((i) => i + 1)
    setSelected(null)
  }

  return (
    <section className={s.card}>
      <div className={s.progressHeader}>
        <span>
          Question {index + 1} / {total}
        </span>
        <span>Score : {score}</span>
      </div>
      <div
        className={s.progressTrack}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={index + (answered ? 1 : 0)}
      >
        <div className={s.progressBar} style={{ width: `${((index + (answered ? 1 : 0)) / total) * 100}%` }} />
      </div>

      <h2 className={s.question}>{current.question}</h2>

      <ul className={s.answers}>
        {current.answers.map((answer, i) => {
          const isCorrect = i === current.correctAnswer
          const state = !answered ? '' : isCorrect ? s.correct : i === selected ? s.wrong : s.dimmed
          return (
            <li key={i}>
              <button
                type="button"
                className={`${s.answer} ${state}`}
                onClick={() => choose(i)}
                disabled={answered}
                aria-pressed={i === selected}
              >
                <span className={s.letter}>{LETTERS[i]}</span>
                <span>{answer}</span>
              </button>
            </li>
          )
        })}
      </ul>

      {answered && (
        <div className={s.feedbackRow}>
          <p
            className={`${s.feedback} ${selected === current.correctAnswer ? s.feedbackOk : s.feedbackKo}`}
            aria-live="polite"
          >
            {selected === current.correctAnswer
              ? 'Bonne réponse !'
              : `Mauvaise réponse. La bonne réponse était : ${current.answers[current.correctAnswer]}`}
          </p>
          <button type="button" className={s.primary} onClick={next} autoFocus>
            {isLast ? 'Voir mon score' : 'Question suivante'}
          </button>
        </div>
      )}
    </section>
  )
}
