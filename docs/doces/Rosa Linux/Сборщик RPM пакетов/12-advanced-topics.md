---
title: "Продвинутые темы пакетирования"
description: "Пакетирование приложений на Python, Go, Rust, контейнеризация, сборка ядра и другие продвинутые сценарии для инженеров сопровождения ROSA Linux."
sidebar_position: 12
---

# 🧠 Продвинутые темы пакетирования

## 🎯 Цель раздела

После изучения этого раздела вы:
- научитесь собирать и сопровождать пакеты на Python, Go и Rust;
- разберётесь в особенностях контейнеризации и работе с Docker;
- узнаете основы сборки ядра под ROSA Linux;
- сможете поддерживать современные приложения в экосистеме ROSA.

---

## 🧩 Пакетирование Python-приложений

### Структура Python-проекта
```

myapp/
├── setup.py
├── src/
│   └── myapp/**init**.py
└── requirements.txt

````

### Пример SPEC-файла
```spec
Name:           myapp
Version:        1.0
Release:        1%{?dist}
Summary:        Example Python app
License:        MIT
Source0:        %{name}-%{version}.tar.gz

BuildArch:      noarch
BuildRequires:  python3-devel, python3-setuptools
Requires:       python3

%description
A simple Python application packaged for ROSA Linux.

%prep
%autosetup -n %{name}-%{version}

%build
%py3_build

%install
%py3_install

%files
%{python3_sitelib}/myapp*
%{_bindir}/myapp

%changelog
* Wed Nov 5 2025 Sergey Braumann <sergeybraumann@gmail.com> 1.0-1
- Initial Python packaging for ROSA
````

> 💡 Используйте макросы `%py3_build` и `%py3_install` — они автоматически настроены для Python3 в ROSA.

---

## ⚙️ Пакетирование Go-приложений

### Основные принципы

1. Сборка выполняется статически (Go binary);
2. Исходники должны быть в `$GOPATH` или модульной структуре (`go.mod`);
3. Пакетирование идёт по классической схеме `%build → %install`.

### Пример SPEC

```spec
Name:           hello-go
Version:        0.9
Release:        1%{?dist}
Summary:        Hello World in Go
License:        BSD
Source0:        %{name}-%{version}.tar.gz

BuildRequires:  golang
Requires:       glibc

%description
A simple Go example packaged for ROSA Linux.

%prep
%autosetup -n %{name}-%{version}

%build
go build -o hello-go ./cmd/hello

%install
install -Dm0755 hello-go %{buildroot}%{_bindir}/hello-go

%files
%{_bindir}/hello-go
```

> 🧱 ROSA поддерживает Go ≥1.21, что позволяет собирать современные приложения без модификаций.

---

## ⚙️ Пакетирование Rust-приложений

### Особенности:

* Используется `cargo`;
* Сборка идёт в изолированной среде (без интернета);
* Требуется правильное определение зависимостей.

### Пример SPEC

```spec
Name:           ferris
Version:        0.1
Release:        1%{?dist}
Summary:        Rust demo application
License:        Apache-2.0
Source0:        %{name}-%{version}.tar.gz

BuildRequires:  rust, cargo
Requires:       glibc

%description
Simple Rust demo for ROSA Linux packaging.

%prep
%autosetup -n %{name}-%{version}

%build
cargo build --release

%install
install -Dm0755 target/release/ferris %{buildroot}%{_bindir}/ferris

%files
%{_bindir}/ferris
%license LICENSE
```

> 🦀 *Rust-пакеты удобны тем, что собираются без внешних зависимостей, что делает их идеальными для reproducible builds.*

---

## 🐳 Контейнеризация и Docker

Иногда инженер сопровождения готовит **контейнерные образы**, например, для тестов или развёртывания CI.

### Пример `Dockerfile`

```dockerfile
FROM rosa2024.1
RUN dnf install -y hello && dnf clean all
CMD ["hello"]
```

### Сборка образа

```bash
docker build -t hello-rosa .
docker run --rm hello-rosa
```

> 💡 Образы на базе ROSA используются для тестов сборки, CI/CD и демонстраций пакетов.

---

## 🧱 Сборка ядра ROSA Linux

Сборка ядра — особый процесс, но полезный для инженеров сопровождения.

### Установка инструментов

```bash
sudo dnf install kernel-source kernel-devel rpmdevtools ncurses-devel
```

### Подготовка

```bash
rpmdev-setuptree
cp /usr/src/kernel/SPECS/kernel.spec ~/rpmbuild/SPECS/
```

### Сборка

```bash
rpmbuild -ba ~/rpmbuild/SPECS/kernel.spec
```

Готовые пакеты появятся в:

```
~/rpmbuild/RPMS/x86_64/
```

> ⚠️ *Не изменяйте ядро без понимания зависимостей модулей и подписи модулей (Secure Boot).*

---

## 🧩 Советы для продвинутого сопровождения

1. **Минимизируйте патчи.**
   Чем меньше изменений к апстриму, тем легче сопровождение.

2. **Используйте `git am` для патчей.**
   Это сохраняет метаданные коммитов и авторство.

3. **Следите за reproducible builds.**
   Одинаковый результат сборки — залог доверия в ABF.

4. **Автоматизируйте тесты.**
   Встраивайте unit-тесты в `%check` секцию:

   ```spec
   %check
   ./test_suite.sh
   ```

---

## 🧠 Мини-тест для самопроверки

| Вопрос                                    | Ответ                                   |
| ----------------------------------------- | --------------------------------------- |
| Какой макрос используется для Python3?    | `%py3_build` и `%py3_install`           |
| Как собрать Go-приложение?                | Через `go build -o <binary>` в `%build` |
| Какой инструмент отвечает за сборку Rust? | `cargo`                                 |
| Что делает `%check` секция?               | Запускает тесты перед упаковкой         |
| Где можно использовать контейнеры ROSA?   | В CI/CD, тестах и развёртывании         |

---

## 🧭 Итого

Теперь вы:

* умеете собирать пакеты на Python, Go и Rust;
* знаете, как интегрировать сборки с контейнерами;
* освоили базовую сборку ядра;
* готовы к финальному этапу — **практическому проекту**, где создадите и опубликуете свой пакет в репозитории ROSA.

Следующий документ — **“Финальный проект”**, где вы пройдёте полный путь от создания исходников до загрузки пакета в Automated Build Farm (ABF).
