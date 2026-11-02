# examen-civique-CSP

Multiple-choice quiz for the civic exam, built with Next.js. Static app: no backend. Each run (page load or "Recommencer") draws 40 random questions without repeats from the dataset.

## Questions

Questions live in `data/questions.json`:

The dataset contains 191 supplied questions about French republican values, symbols, secularism, institutions, elections, local government, the European Union, rights and duties, justice, environmental responsibility, history, geography, culture, everyday procedures, employment, healthcare, and education. The questions retain the supplied order across the five batches (37, 46, 30, 47, and 31 questions), including the two supplied variants about compulsory education (IDs 186 and 189). Each question has four answer choices written in simple French (A2–B1), with one correct answer. Correct answers are distributed across all four positions.

Civic reference: [Symbols and founding texts of the French Republic — Élysée](https://www.elysee.fr/la-presidence/les-symboles-de-la-republique-francaise).

Additional references: [Senate elections — Sénat](https://www.senat.fr/connaitre-le-senat/role-et-fonctionnement/mode-delection-des-senateurs.html), [EU citizens' voting rights in France — Service Public](https://www.service-public.gouv.fr/particuliers/vosdroits/F1937), [French departments — Vie publique](https://www.vie-publique.fr/carte/270569-decoupage-administratif-de-la-france-les-departements), and [EU facts and figures — European Union](https://european-union.europa.eu/principles-countries-history/facts-and-figures-european-union_fr).

Rights and duties references: [Civic training — Ministry of the Interior](https://formation-civique.interieur.gouv.fr/fiches-par-thematiques/droits-et-devoirs/), [Constitutional rights — Conseil constitutionnel](https://qpc360.conseil-constitutionnel.fr/bloc-constitutionnalite), and Service Public guidance on [abortion](https://www.service-public.gouv.fr/particuliers/vosdroits/F1551), [divorce without mutual consent](https://www.service-public.gouv.fr/particuliers/vosdroits/F10568), and [bulky waste collection](https://www.service-public.gouv.fr/particuliers/vosdroits/F31954).

Historical references: [Jules Ferry and the school laws — Ministry of Education](https://media.education.gouv.fr/file/journeepatrimoine/36/6/09_ferry_154366.pdf), [Founding European treaties — European Union](https://european-union.europa.eu/principles-countries-history/principles-and-values/founding-agreements_fr), and [The national holiday of 14 July — Élysée](https://www.elysee.fr/la-presidence/la-fete-nationale-du-14-juillet). The school question specifies free public primary education from 1881; the EEC question refers to the Treaty of Rome signed in 1957, which entered into force in 1958.

Practical references: Service Public guidance on [minimum working age](https://www.service-public.gouv.fr/particuliers/vosdroits/F1649), [the SMIC](https://www.service-public.gouv.fr/particuliers/vosdroits/F2300), and [foreign entrepreneurs](https://entreprendre.service-public.gouv.fr/vosdroits/F22494); [registration with France Travail](https://www.francetravail.fr/candidat/vos-droits-et-demarches/vos-demarches-aupres-de-pole-emp/linscription-et-le-rendez-vous-e.html); [the treating physician — Assurance Maladie](https://www.ameli.fr/assure/droits-demarches/principes/choisir-et-declarer-votre-medecin-traitant); and [education principles — Ministry of Education](https://www.education.gouv.fr/les-grands-principes-du-systeme-educatif-9842). Instruction is compulsory from ages 3 to 16; the separate training obligation continues until age 18. France Travail registration is presented as a way to obtain support, not as a legal prerequisite for every job application.

```json
{
  "questions": [
    {
      "id": 1,
      "question": "Quelle est la devise de la République française ?",
      "answers": ["…", "…", "…", "…"],
      "correctAnswer": 1
    }
  ]
}
```

- `answers`: exactly 4 non-empty strings.
- `correctAnswer`: 0-based index of the correct answer (0–3).
- `id`: unique number.

The file is validated in `lib/questions.ts` and bundled at build time, so a malformed file fails `pnpm build`. Rebuild the app or image after you edit it.

## Development

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build
pnpm check-types
```

## Docker

`docker-compose.yml` is for Coolify: it only `expose`s port 3000 on the Docker network and publishes nothing on the host, so it can't collide with other services on the server. In Coolify, set the service domain with the container port, e.g. `https://example.com:3000`.

To run locally:

```bash
docker build -t examen-civique-csp .
docker run -p 3000:3000 examen-civique-csp   # http://localhost:3000
```
