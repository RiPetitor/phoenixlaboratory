---
title: "Основы RPM и SRPM"
description: "Изучение структуры RPM и SRPM пакетов, разбор SPEC-файлов, их ключевых секций и практическая сборка простого пакета через rpmbuild."
sidebar_position: 3
---

# 📦 Основы RPM и SRPM

## 🎯 Цель раздела

На этом этапе вы научитесь:
- понимать, из чего состоит RPM-пакет;
- разбирать структуру SRPM;
- работать со SPEC-файлами;
- собирать свой первый пакет с помощью `rpmbuild`.

---

## 🧩 Что такое RPM

**RPM (Red Hat Package Manager)** — это формат бинарных пакетов, используемый во многих дистрибутивах Linux (включая ROSA).
Он хранит:
- исполняемые файлы и библиотеки;
- метаданные (описание, зависимости, версия);
- скрипты установки и удаления.

Пример RPM-файла:
```

nano-7.2-1.rosa2024.1.x86_64.rpm

````

Здесь:
- **nano** — имя пакета,
- **7.2** — версия исходного ПО,
- **1** — релиз сборки,
- **rosa2024.1** — таргетный дистрибутив,
- **x86_64** — архитектура.

---

## 🧱 Что такое SRPM

**SRPM (Source RPM)** — это исходный RPM-пакет, содержащий:
- исходный код (обычно tarball, например, `hello-2.10.tar.gz`);
- SPEC-файл (инструкции сборки);
- дополнительные патчи и ресурсы.

SRPM создаётся при помощи:
```bash
rpmbuild -bs SPECS/hello.spec
````

> 💡 *SRPM — это то, что вы загружаете в Automated Build Farm (ABF) для сборки и тестирования.*

---

## 📜 SPEC-файл: сердце пакета

SPEC-файл определяет, **как** собирается пакет.
Он лежит в `~/rpmbuild/SPECS/` и состоит из секций:

| Секция                      | Назначение                   |
| --------------------------- | ---------------------------- |
| **Name, Version, Release**  | Идентификаторы пакета        |
| **Summary, License, URL**   | Описание и метаданные        |
| **Source, Patch**           | Исходники и патчи            |
| **BuildRequires, Requires** | Зависимости                  |
| **%description**            | Подробное описание           |
| **%prep**                   | Распаковка и подготовка      |
| **%build**                  | Сборка                       |
| **%install**                | Установка в buildroot        |
| **%files**                  | Какие файлы включать в пакет |
| **%changelog**              | История изменений            |

---

## 🔍 Пример простого SPEC-файла

Файл: `hello.spec`

```spec
Name:           hello
Version:        1.0
Release:        1%{?dist}
Summary:        Simple Hello World application
License:        MIT
URL:            https://example.com/hello
Source0:        hello-1.0.tar.gz

BuildRequires:  gcc
Requires:       glibc

%description
A simple Hello World C application for demonstration purposes.

%prep
%setup -q

%build
gcc hello.c -o hello

%install
mkdir -p %{buildroot}/usr/bin
install -m 0755 hello %{buildroot}/usr/bin/hello

%files
/usr/bin/hello

%changelog
* Wed Oct 29 2025 Sergey Braumann <sergeybraumann@gmail.com> 1.0-1
- Initial build for ROSA Linux
```

---

## 🧰 Практическая сборка пакета

1. Скачайте пример исходников:

   ```bash
   mkdir -p ~/rpmbuild/SOURCES
   cd ~/rpmbuild/SOURCES
   echo '#include <stdio.h>\nint main(){printf("Hello, ROSA!\\n");return 0;}' > hello.c
   tar czf hello-1.0.tar.gz hello.c
   ```

2. Сохраните SPEC-файл в `~/rpmbuild/SPECS/hello.spec`.

3. Выполните сборку:

   ```bash
   rpmbuild -ba ~/rpmbuild/SPECS/hello.spec
   ```

После успешной сборки вы получите:

```
~/rpmbuild/RPMS/x86_64/hello-1.0-1.x86_64.rpm
~/rpmbuild/SRPMS/hello-1.0-1.src.rpm
```

---

## 🧾 Проверка пакета

Проверьте содержимое пакета:

```bash
rpm -qlp ~/rpmbuild/RPMS/x86_64/hello-1.0-1.x86_64.rpm
```

Вывод:

```
/usr/bin/hello
```

Проверьте качество:

```bash
rpmlint ~/rpmbuild/SPECS/hello.spec ~/rpmbuild/RPMS/x86_64/hello-1.0-1.x86_64.rpm
```

---

## 🧠 Мини-тест для самопроверки

| Вопрос                                     | Ответ                                      |
| ------------------------------------------ | ------------------------------------------ |
| Что такое SRPM?                            | Исходный пакет, содержащий код и SPEC-файл |
| Где хранится SPEC-файл?                    | В `~/rpmbuild/SPECS/`                      |
| Для чего используется `%build`?            | Для компиляции исходников                  |
| Какой инструмент собирает RPM?             | `rpmbuild`                                 |
| Как загрузить пакет в систему сборки ROSA? | Через **Automated Build Farm (ABF)**       |

---

## 🧭 Итого

Теперь вы:

* знаете, из чего состоят RPM и SRPM;
* умеете читать и писать SPEC-файлы;
* собрали свой первый тестовый пакет;
* готовы к следующему этапу — изучению процесса сборки и автоматизации в ROSA.

Следующий документ — **“Сборочная система и rpmbuild”** — расскажет, как работает процесс сборки, макросы, и как управлять окружением при создании пакетов.
