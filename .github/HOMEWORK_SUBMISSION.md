<!-- Draft body for fwdays homework PR. Use: gh pr create --draft --body-file .github/HOMEWORK_SUBMISSION.md -->
<!-- Update "Відео-демо" before marking PR ready for review. -->

## Автор

**Serhii Rozum**

## Проєкт

**Invoice Maker 2026** — веб-сервіс для швидкого створення **двомовних (українська + англійська) інвойсів** для українських ФОПів і фрілансерів, які виставляють рахунки іноземним клієнтам у **USD** або **EUR**.

Користувач заповнює форму → система підбирає опис послуги за **NACE 2.1-UA** → розраховує суми та дати → генерує HTML/PDF з шаблону `docs/invoice-template.html`. Дані MVP зберігаються в браузері (browser-first).

**Стек:** Next.js 16, React 19, TypeScript (strict), Tailwind v4, shadcn/ui, OpenSpec (SDD).

**Репозиторій:** https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026

## Відео-демо (1–2 хв)

Video: _буде додано після запису_

## Які практики Agentic Engineering застосовано

Нижче — чесний статус по кожній практиці з курсу. Де практика ще не доведена до кінця, є **TODO** для завершення до фінальної здачі.

---

### 1. Контекст-інженерія — ✅ застосовано

**Статичний контекст** (завжди в репозиторії, агент читає перед роботою):

| Артефакт | Призначення |
| --- | --- |
| `AGENTS.md` | Конституція агента: Next.js 16 rules, WEG3D Fin design system, OpenSpec workflow |
| `CONTEXT.md` | Доменний глосарій (Invoice, Client, Snapshot, NACE, статуси) |
| `docs/requirements.md` | 40+ нумерованих FR/NFR з трасуванням |
| `Design.md` | UI-правила WEG3D Fin |
| `docs/ARCHITECTURE.md`, `docs/adr/0002-browser-first-mvp.md` | Архітектура та рішення |
| `openspec/specs/<capability>/spec.md` | 11 capability-спек (авторитетна поведінка) |

**Динамічний контекст** (інжектується під задачу):

| Артефакт | Призначення |
| --- | --- |
| `openspec/config.yaml` | Project context для OpenSpec CLI (домен, стек, шляхи, verification gates) |
| Slash-команди `/opsx:*` | Cursor / Claude / Windsurf — propose → apply → sync → archive |
| `.scratch/mvp-spec-coherence/map.md` | Трекер узгоджених рішень між сесіями |

**Що робив я:** продуктове бачення, доменні рішення (NACE 2.1-UA, browser-first, snapshot-модель).  
**Що робив агент:** наповнення спек, scaffold UI, рефакторинг за правилами з `AGENTS.md`.

---

### 2. Специфікації наперед (SDD) — ✅ застосовано

- **OpenSpec** з living specs у `openspec/specs/` (shell, invoice-calc, nace-catalog, document-render, export-share, …).
- Workflow: `/opsx:propose` → design + tasks + delta specs → `/opsx:apply` → `/opsx:sync` → `/opsx:archive`.
- Ланцюг трасування: `FR-*` (requirements) → OpenSpec scenario → код у `src/lib/`.
- `openspec validate --strict` — частина verification gates.

**TODO до здачі:**

- [ ] Завершити перший vertical slice (G4) через повний OpenSpec change (`openspec/changes/` → apply → sync → archive).
- [ ] Переконатися, що кожна імплементована фіча має відповідний scenario в spec, а не лише в README.

---

### 3. Верифікація — 🔄 частково (потрібно посилити)

**Що вже є:**

- Детерміновані гейти в `package.json`: `npm run typecheck`, `npm run lint`, `npm run build`.
- `GET /api/health` з контрактом у `openspec/specs/shell/spec.md`.
- **CodeRabbit** — увімкнено на форку, ревʼює PR українською (перевірено).
- ADR та `.scratch/` issues — документовані критерії прийняття.

**Що ще не зроблено (критично для курсу):**

- [ ] **Vitest** — згаданий у `docs/requirements.md` (`TC-STACK-06`) і README, але **ще не встановлений** (`package.json` без `vitest`).
- [ ] **Test-first для `src/lib/`** — червоний тест зі спеки → зелена імплементація (calc, NACE matcher, template vars).
- [ ] **`openspec validate --strict`** — додати в CI або pre-push hook.
- [ ] **Evals / smoke** — мінімальний сценарій «заповнити форму → превʼю → PDF» (ручний чекліст або Playwright).

---

### 4. Maker ≠ checker — 🔄 частково (потрібно формалізувати)

**Що вже є:**

- Правило зафіксовано в README та engineering pipeline (G7 adversarial review).
- Cursor subagents: `code-reviewer`, `bugbot`, `ultracite-reviewer` — доступні для окремого проходу.
- CodeRabbit як зовнішній checker на PR.

**Що ще не зроблено:**

- [ ] **Систематичний checker-прохід** після кожного slice: maker (Composer) імплементує → окремий агент ревʼюить diff (не той самий чат).
- [ ] **Запис у PR / change log** — коротка нотатка «reviewed by checker agent, findings: …».
- [ ] Для фінального PR: пройти CodeRabbit feedback і поітерувати.

---

### 5. Цикли (loop engineering) — ❌ ще не застосовано

Зараз робота йде переважно через **ручні сесії** та slash-команди `/opsx:*`, а не через автономний loop «поки tasks не зелені».

**TODO до здачі:**

- [ ] Підключити **Cursor loop** (`/loop` або skill `loop`) для одного vertical slice: tasks з OpenSpec change → implement → verify → repeat until done.
- [ ] Або **CI-watcher / babysit** — агент чекає на `npm run build` / lint і сам виправляє помилки в циклі.
- [ ] Зафіксувати в PR один конкретний приклад: «slice X пройшов через N ітерацій loop без ручного мікроменеджменту».

---

### 6. Project Factory — ⏭️ свідомо не застосовано (опційно)

Повна фабрика (`/project-factory:init`) **не запускалась** — для MVP обрано легший стек: OpenSpec + `AGENTS.md` + slash-команди.

**TODO (опційно, якщо встигнемо):**

- [ ] Оцінити, чи дає Project Factory додаткову цінність поверх наявного OpenSpec workflow.
- [ ] Якщо так — `/project-factory:init` і порівняти артефакти з поточною структурою.

---

### Інструменти та MCP

| Інструмент | Використання |
| --- | --- |
| **Cursor** | Основний Agentic IDE, Composer, slash-команди `/opsx:*` |
| **OpenSpec CLI** | `@fission-ai/openspec` — propose, validate, sync |
| **CodeRabbit** | Авто-ревʼю homework PR |
| **MCP Context7** | Актуальна документація Next.js / React під час імплементації |
| **MCP Vercel** | Деплой та runtime logs (планується для PDF route) |

---

### Розподіл ролей: я vs агент

| Serhii Rozum (людина) | AI-агент |
| --- | --- |
| Продукт, пріоритети MVP, домен (NACE, ФОП, двомовність) | Генерація коду за спеками |
| Архітектурні рішення (browser-first, ADR-0002) | UI-компоненти, boilerplate, рефакторинг |
| Фінальне прийняття змін, запис відео | Дослідження best practices, наповнення docs/specs |
| Напрямок і judgment | Ітерації в межах заданого контексту |

## (Опційно) Посилання на код

https://github.com/eresemai/2026-fwdays-agentic-greenfield-task-INVOICE-MAKER-2026

---

### Чекліст

- [x] Вказано справжнє імʼя (Serhii Rozum)
- [ ] Додано посилання на відео-демо (1–2 хв)
- [x] Описано застосовані практики Agentic Engineering (з чесними TODO)
- [ ] Результат робочий і доведений до кінця
- [ ] Loop engineering — хоча б один slice через автономний цикл
- [ ] Vitest + test-first для `src/lib/`
- [ ] Maker ≠ checker — задокументований окремий review-прохід
