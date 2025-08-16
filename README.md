# PhoenixLab Site

Сайт построен с использованием **Docusaurus** — современного генератора статических веб-сайтов.

## Требования

- Node.js 18.0 или выше
- npm или yarn

## Быстрый старт

### 1. Клонирование репозитория
```bash
git clone https://gitverse.ru/Phoenix97/PhoenixLab-site.git
cd PhoenixLab-site
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Запуск в режиме разработки
```bash
npm start
```

Сайт откроется по адресу `http://localhost:3000`. Изменения применяются автоматически.

## Команды

### Разработка
```bash
npm start          # Запуск сервера разработки
npm run build      # Сборка для продакшена
npm run serve      # Локальный просмотр собранного сайта
```

### Проверка качества
```bash
npm run clear      # Очистка кэша Docusaurus
```

## Структура проекта

```
PhoenixLab-site/
├── blog/              # Блог сайта
├── docs/              # Документация
├── src/
│   ├── components/    # React компоненты
│   ├── css/           # Стили
│   └── pages/         # Статические страницы
├── static/            # Статические файлы
├── docusaurus.config.js
└── package.json
```

## Развертывание

Для развертывания на GitHub Pages или аналогичный сервис:

```bash
npm run build
```

Содержимое папки `build/` можно разместить на любом хостинге статических сайтов.

## Документация

- [Официальная документация Docusaurus](https://docusaurus.io/)
- [Руководство по развертыванию](https://docusaurus.io/docs/deployment)
