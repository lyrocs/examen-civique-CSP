import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Examen civique — Entraînement',
  description: "Entraînez-vous à l'examen civique avec des questions à choix multiples.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script defer src="https://analytics.lyrocs.ovh/script.js" data-website-id="09ed7cef-9d26-4317-abb1-3c48afdb32ff"></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
