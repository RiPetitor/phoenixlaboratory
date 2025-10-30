---
title: Оптимизация Btrfs для HDD
sidebar_position: 2
description: Настройки Btrfs для жёстких дисков
---

Для HDD цель — минимизировать перемещения головок и держать фрагментацию под контролем.

## Опции монтирования (`/etc/fstab`)
```bash
relatime,space_cache=v2,compress=zstd:1,autodefrag
```
- `relatime` уменьшает записи метаданных, сохраняя совместимость.
- `compress=zstd:1` — лёгкое сжатие снижает объём I/O.
- `autodefrag` полезен для мелких и часто меняющихся файлов.

**Пример fstab:**
```bash
UUID=<uuid> / btrfs subvol=@,relatime,space_cache=v2,compress=zstd:1,autodefrag 0 0
```

## Планировщик I/O
- Рекомендуется **bfq** (интерактивная отзывчивость) или **mq-deadline**.
```bash
cat /sys/block/sda/queue/scheduler
echo bfq | sudo tee /sys/block/sda/queue/scheduler
```

## Обслуживание
- Балансировку запускать реже, по мере заполнения (см. раздел про CLI-обслуживание).
- Для больших монолитных файлов допустимо точечно дефрагментировать:
```bash
sudo btrfs filesystem defragment -v -clzo /path/to/large.file
```
(или без `-c`, если компрессия не нужна)

---
