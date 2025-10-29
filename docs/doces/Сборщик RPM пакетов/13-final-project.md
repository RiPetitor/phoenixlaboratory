---
title: "Финальный проект: создание и публикация пакета"
description: "Практическая работа: сборка собственного пакета с нуля, проверка качества, загрузка на Automated Build Farm (ABF) и публикация в репозиторий ROSA Linux."
sidebar_position: 13
---

# 🏁 Финальный проект: создание и публикация пакета

## 🎯 Цель проекта

Завершающий этап курса объединяет все навыки, полученные ранее.
Вы создадите собственный RPM-пакет с нуля, проведёте его сборку, тестирование и публикацию через **Automated Build Farm (ABF)**.

После выполнения вы:
- полностью освоите жизненный цикл пакета;
- научитесь документировать и сопровождать проект;
- получите готовый пример для портфолио инженера сопровождения ROSA Linux.

---

## 🧱 Шаг 1. Подготовка проекта

Создадим тестовый проект на C, Python или Go — на ваш выбор.
Для примера возьмём классический C-проект **`hello-rosa`**.

```bash
mkdir ~/projects/hello-rosa
cd ~/projects/hello-rosa
echo '#include <stdio.h>\nint main(){printf("Hello from ROSA Linux!\\n");return 0;}' > hello.c
tar czf hello-rosa-1.0.tar.gz hello.c
````

Скопируйте архив в `SOURCES`:

```bash
cp hello-rosa-1.0.tar.gz ~/rpmbuild/SOURCES/
```

---

## ⚙️ Шаг 2. Создание SPEC-файла

```bash
rpmdev-newspec hello-rosa
```

Затем откройте `~/rpmbuild/SPECS/hello-rosa.spec` и заполните:

```spec
Name:           hello-rosa
Version:        1.0
Release:        1%{?dist}
Summary:        My first ROSA Linux package
License:        MIT
URL:            https://example.com/hello-rosa
Source0:        %{name}-%{version}.tar.gz

BuildRequires:  gcc
Requires:       glibc

%description
A simple Hello World program packaged for ROSA Linux.

%prep
%autosetup -n %{name}-%{version}

%build
gcc hello.c -o hello-rosa

%install
install -Dm0755 hello-rosa %{buildroot}%{_bindir}/hello-rosa

%files
%license LICENSE
%{_bindir}/hello-rosa

%changelog
* Thu Nov 6 2025 Sergey Braumann <sergeybraumann@gmail.com> 1.0-1
- Initial build for ROSA Linux
```

---

## 🧩 Шаг 3. Сборка пакета

```bash
rpmbuild -ba ~/rpmbuild/SPECS/hello-rosa.spec
```

Результат:

```
~/rpmbuild/RPMS/x86_64/hello-rosa-1.0-1.x86_64.rpm
~/rpmbuild/SRPMS/hello-rosa-1.0-1.src.rpm
```

---

## 🧪 Шаг 4. Проверка качества

Проверьте пакет на ошибки и структуру:

```bash
rpmlint SPECS/hello-rosa.spec RPMS/x86_64/hello-rosa-1.0-1.x86_64.rpm
```

Выведите содержимое:

```bash
rpm -qlp RPMS/x86_64/hello-rosa-1.0-1.x86_64.rpm
```

Проверьте установку:

```bash
sudo dnf install ./RPMS/x86_64/hello-rosa-1.0-1.x86_64.rpm
hello-rosa
```

---

## 🧰 Шаг 5. Проверка сборки в mock

```bash
mock rebuild ~/rpmbuild/SRPMS/hello-rosa-1.0-1.src.rpm
```

Лог сборки:

```
/var/lib/mock/rosa2024.1-x86_64/result/build.log
```

> 💡 Если сборка проходит в mock — она почти наверняка пройдёт и на ABF.

---

## 🚀 Шаг 6. Публикация через Automated Build Farm (ABF)

1. Создайте новый проект на [https://abf.rosalinux.ru](https://abf.rosalinux.ru)
   — выберите имя `hello-rosa`.

2. Клонируйте репозиторий:

   ```bash
   git clone https://abf.rosalinux.ru/yourname/hello-rosa.git
   cd hello-rosa
   ```

3. Скопируйте `SPEC` и `SOURCES`:

   ```bash
   cp ~/rpmbuild/SPECS/hello-rosa.spec .
   cp ~/rpmbuild/SOURCES/hello-rosa-1.0.tar.gz .
   ```

4. Добавьте и зафиксируйте изменения:

   ```bash
   git add .
   git commit -m "init: first package for ROSA"
   git push origin main
   ```

5. Создайте **Pull Request (PR)**, если работаете в ветке,
   и дождитесь ревью от коллег.

---

## 🧩 Шаг 7. Автоматическая сборка на ABF

После пуша ABF автоматически:

1. создаст SRPM;
2. запустит сборку;
3. проверит зависимости;
4. выложит результат в `testing`-репозиторий.

Мониторинг:

* перейдите в раздел **Builds**;
* откройте `build.log` и убедитесь в статусе `Succeeded`.

---

## 🧾 Шаг 8. Публикация и обновления

После успешной сборки:

* пакет появится в репозитории `testing`;
* после одобрения QA попадёт в `updates`.

Для обновления:

1. измените `Version` или `Release`;
2. обновите `changelog`;
3. пересоберите SRPM;
4. отправьте PR с изменениями.

---

## 🧱 Результат проекта

В результате вы получите:

* исходный код проекта;
* SPEC-файл и SRPM;
* опубликованный RPM-пакет;
* опыт полного цикла сопровождения — от исходников до релиза в ABF.

---

## 🧠 Самопроверка

| Вопрос                                   | Ответ                                  |
| ---------------------------------------- | -------------------------------------- |
| Что публикуется в ABF?                   | SRPM и SPEC-файлы                      |
| Где должен храниться changelog?          | В конце SPEC                           |
| Что делает команда `mock rebuild`?       | Проверяет сборку в изолированной среде |
| Когда повышается Release?                | При изменении SPEC или патчей          |
| Что подтверждает успешную сборку на ABF? | Статус `Succeeded` в Build Logs        |

---

## 🧭 Завершение курса

Поздравляем 🎉 — вы завершили курс **«Инженер по сопровождению RPM-пакетов ROSA Linux»**!

Теперь вы умеете:

* готовить окружение и использовать инструменты сборки;
* разрабатывать, сопровождать и тестировать пакеты;
* работать с Git и ABF;
* обеспечивать качество, стабильность и соответствие политикам ROSA.

---

## 📘 Что делать дальше

1. **Продолжайте сопровождать реальные пакеты** — выберите один из открытых проектов ROSA и внесите вклад.
2. **Следите за обновлениями ABF** — система постоянно развивается.
3. **Освойте ROSA Packaging Policies и CI API** для углубления навыков.
4. **Постройте личный портфолио**: опубликуйте свои пакеты на GitHub или ABF.

> 💬 *Ваш путь инженера сопровождения только начинается — теперь вы готовы к реальной практике и работе в экосистеме ROSA Linux.*
