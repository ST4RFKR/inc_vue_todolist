# Vue TodoList

Frontend-приложение для управления тудулистами и задачами на Vue 3 + TypeScript.

Проект использует API `social-network.samuraijs.com`, поддерживает авторизацию, защищенный роут `home`, CRUD для тудулистов/задач и переиспользуемый confirm-модал для критичных действий.

## Возможности

- Авторизация (`login`, `logout`, `me`) через backend API.
- Protected route: `/` доступен только для авторизованных пользователей.
- CRUD тудулистов:
- создание списка;
- редактирование названия;
- удаление с подтверждением.
- CRUD задач внутри списка:
- создание;
- изменение названия;
- переключение статуса completed/new;
- удаление.
- Фильтрация задач по статусу: `All`, `Active`, `Completed`.
- Переиспользуемый `ConfirmModal`:
- подтверждение удаления тудулиста;
- подтверждение выхода из аккаунта.
- Переключение темы (`light`, `dark`, `system`).
- Toast-уведомления при успешных/ошибочных операциях.

## Технологии

- `Vue 3` (`<script setup>`)
- `TypeScript`
- `Vite 8`
- `Vue Router 4`
- `Pinia`
- `@tanstack/vue-query`
- `Axios`
- `Tailwind CSS 4`
- `shadcn-vue` / `Reka UI`
- `vee-validate` + `zod`
- `vue3-toastify`
- `@vueuse/core`

## Архитектура

Структура проекта близка к feature-first:

- `src/features`:
- бизнес-фичи (`auth`, `tasks`, `todolists`);
- API-слой, модели (хуки), UI.
- `src/pages`:
- роутовые страницы (`todolist-view`, `login-view`, `faq-view`, `not-found`).
- `src/shared`:
- общие UI-компоненты, конфиг, store, api, утилиты.

Ключевые технические решения:

- Авторизация:
- токен хранится в `localStorage` (`auth-token`);
- в `Axios` request-interceptor автоматически добавляется `Authorization: Bearer <token>`;
- в `main.ts` реализован `router.beforeEach`, блокирующий `meta.requiresAuth` роуты для неавторизованных пользователей.
- Проверка сессии:
- при старте приложения вызывается `useMe()` (в `App.vue`);
- если `me` падает, пользователь разлогинивается и уходит на `/login`.
- Серверное состояние:
- все запросы и мутации работают через `Vue Query`;
- после мутаций используются `invalidateQueries` для актуализации данных;
- для обновления задачи есть optimistic update + rollback.

## Роуты

- `/`:
- `home`, защищенный (`requiresAuth: true`), страница тудулистов.
- `/login`:
- страница входа.
- `/faq`:
- FAQ (заглушка).
- `/:pathMatch(.*)*`:
- 404 (заглушка).

## Быстрый старт

### 1. Требования

- `Node.js` 20+
- `npm` (или `pnpm`/`bun`)

### 2. Установка зависимостей

```bash
bun install
```

### 3. Переменные окружения

Создай `.env` в корне проекта:

```env
VITE_BASE_URL=https://social-network.samuraijs.com/api/1.1
VITE_API_KEY=your_api_key
VITE_AUTH_TOKEN=optional_token
```

Примечания:

- в коде используются `VITE_BASE_URL` и `VITE_API_KEY`;
- `VITE_AUTH_TOKEN` в текущей реализации напрямую не используется.

### 4. Запуск

```bash
bun run dev
```

Приложение стартует на `http://localhost:3000`.

## Скрипты

- `npm run dev`: запуск dev-сервера на порту `3000`.
- `npm run build`: type-check (`vue-tsc`) + production build.
- `npm run preview`: локальный preview production build.
- `npm run test`: запуск `vitest`.

## Демо-аккаунт

В форме логина показаны тестовые данные:

- email: `free@samuraijs.com`
- password: `free`

## Структура директорий

```text
src/
  features/
    auth/sign-in/
    tasks/
    todolists/
  pages/
    todolist-view/
    login-view/
    faq-view/
    not-found/
  shared/
    api/
    components/
      common/
      ui/
    config/
    constants/
    lib/
    store/
  App.vue
  main.ts
  style.css
```

## Что можно улучшить

- Добавить unit/integration тесты для ключевых хуков и UI.
- Добавить `.env.example` без чувствительных данных.
- Добавить глобальный обработчик `401` в `Axios` response interceptor.
- Расширить FAQ и страницу 404.
