Project File Structure

.
├─ .gitignore
├─ AGENTS.md
├─ DEV_PLAN.md
├─ FILE_STRUCTURE.md
├─ README.md
├─ Sourses_info.md
├─ UI_UX_PLAN.md
├─ index.html
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ vite.config.ts
├─ src/
│  ├─ index.tsx
│  ├─ style.css
│  ├─ api/
│  │  ├─ bobsBurgers.ts
│  │  └─ southPark.ts
│  ├─ components/
│  │  ├─ App.tsx
│  │  ├─ Home.tsx
│  │  ├─ ShowPage.tsx
│  │  └─ ShowStats.tsx
│  ├─ models/
│  │  ├─ index.ts
│  │  ├─ normalizers.ts
│  │  └─ store.ts
│  └─ utils/
│     └─ missingApiLogger.ts
└─ test/
   ├─ bobsBurgers.test.ts
   ├─ missingApiLogger.test.ts
   ├─ models.test.ts
   └─ southPark.test.ts

Notes
- Vite provides dev/build/preview scripts via `package.json`.
- The SPA entry is `index.html` mounting `#root` and loading `src/index.tsx`.

