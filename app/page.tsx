import { Quiz } from '@/components/Quiz'
import { questions } from '@/lib/questions'
import s from './page.module.css'

export default function HomePage() {
  return (
    <main className={s.main}>
      <h1 className={s.title}>Examen civique</h1>
      <Quiz pool={questions} />
    </main>
  )
}
