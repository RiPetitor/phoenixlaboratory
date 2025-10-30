---
title: Обслуживание Btrfs из командной строки
sidebar_position: 3
description: Набор практических команд
---

Этот раздел — шпаргалка по основным операциям обслуживания Btrfs.

## Использование пространства и статусы
```bash
sudo btrfs filesystem usage /
sudo btrfs filesystem df /
sudo btrfs device stats /
```

## Балансировка (перераспределение блоков)
Лёгкая балансировка по мере заполнения:
```bash
sudo btrfs balance start -dusage=75 -musage=75 /
```
Более агрессивно при нехватке места:
```bash
sudo btrfs balance start -dusage=50 -musage=50 /
```
Проверить прогресс/результат:
```bash
sudo btrfs balance status /
```

## Scrub (проверка целостности)
```bash
sudo btrfs scrub start -B -d -R /
```
- `-B` — ждать завершения; `-d` — прогресс; `-R` — отчёт.

## Выборочные операции
- Дефрагментировать файл/каталог:
```bash
sudo btrfs filesystem defragment -r -v /path/to/dir
```
- Компрессия существующих файлов (перезапись):
```bash
sudo btrfs filesystem defragment -r -v -czstd /path/to/dir
```

## Осторожно: `btrfs check`
`btrfs check` — оффлайновая и потенциально опасная операция. Используйте **только** на размонтированном разделе и при наличии бэкапа.
```bash
sudo umount /mountpoint
sudo btrfs check --readonly /dev/<device>
```

## TRIM
```bash
sudo systemctl status fstrim.timer
sudo systemctl enable --now fstrim.timer
```

---
