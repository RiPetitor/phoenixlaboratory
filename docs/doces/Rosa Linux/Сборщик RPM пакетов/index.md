---
sidebar_position: 0
---

# 👨‍💻 Инженер по сопровождению RPM-пакетов (ROSA Linux)

import Card from '@site/src/components/Card';

Добро пожаловать в обучающее руководство по профессии **Инженер по сопровождению RPM-пакетов ROSA Linux**.
Это пошаговый курс — от подготовки окружения и базовых знаний Linux до автоматизации сборок через **Automated Build Farm (ABF)**.

---

## 📘 Меню курса

<Card
  title="Подготовка окружения"
  description="Введение в профессию и настройка рабочего окружения для сборки RPM-пакетов ROSA Linux."
  to="./prepare"
/>

<Card
  title="Основы Linux"
  description="Изучение базовых принципов Linux, файловой структуры и работы с терминалом."
  to="./linux-basics"
/>

<Card
  title="Основы RPM и SRPM"
  description="Как устроены пакеты RPM и SRPM, структура SPEC-файла и первая сборка."
  to="./rpm-fundamentals"
/>

<Card
  title="Сборочная система и rpmbuild"
  description="Изучаем макросы, buildroot и порядок секций SPEC-файла на практике."
  to="./build-system"
/>

<Card
  title="Патчи, исходники и версии"
  description="Создание и применение патчей, обновление версий и управление исходниками."
  to="./patching-and-sources"
/>

<Card
  title="Зависимости и SPEC-файл"
  description="Работа с BuildRequires, скриптовыми секциями и чистый стиль оформления SPEC."
  to="./dependencies-and-spec"
/>

<Card
  title="Отладка и устранение ошибок"
  description="Анализ логов, mock, chroot и воспроизведение ошибок сборки."
  to="./debugging-and-troubleshooting"
/>

<Card
  title="Проверка качества пакетов"
  description="Использование rpmlint, проверка лицензий и соблюдение ROSA Packaging Guidelines."
  to="./quality-and-guidelines"
/>

<Card
  title="Git и командная работа"
  description="Работа с ветками, Pull Request и ревью в ABF."
  to="./collaboration-and-git"
/>

<Card
  title="CI/CD и автоматизация сборок"
  description="Настройка автоматических сборок, публикация и интеграция с Git."
  to="./ci-and-automation"
/>

<Card
  title="Сопровождение и выпуск обновлений"
  description="Цикл жизни пакета, changelog, LTS, репозитории и публикации."
  to="./distribution-and-maintenance"
/>

<Card
  title="Продвинутые темы"
  description="Пакетирование Python, Go, Rust, Docker и сборка ядра ROSA Linux."
  to="./advanced-topics"
/>

<Card
  title="Финальный проект"
  description="Создание и публикация собственного пакета на Automated Build Farm (ABF)."
  to="./final-project"
/>

---

> 💡 *Совет: проходите темы по порядку — каждая последующая опирается на предыдущую.
> Курс подойдёт как новичкам, так и специалистам, переходящим в сопровождение RPM-пакетов ROSA Linux.*
