---
title: Оптимизация Btrfs для SSD и NVMe
sidebar_position: 1
description: Рекомендованные параметры монтирования, планировщики и TRIM для твердотельных накопителей (SATA SSD и NVMe).
---

Btrfs отлично работает на твердотельных накопителях, если включить правильные опции монтирования и следить за TRIM.

## Рекомендованные опции монтирования (`/etc/fstab`)

### NVMe (производительность + экономия места)
```bash
noatime,ssd,space_cache=v2,discard=async,compress=zstd:5,autodefrag
```

### SATA SSD (сбалансированно и безопасно)
```bash
noatime,ssd,space_cache=v2,discard=async,compress=zstd:3,autodefrag
```

**Пояснения:**
- `noatime` уменьшает лишние записи; на SSD/NVMe предпочтительнее `relatime`.
- `compress=zstd:N` — zstd даёт лучшую компрессию и меньше фрагментирует; N=3–5.
- `discard=async` — асинхронный TRIM; не тормозит как синхронный `discard`.
- `autodefrag` — полезно для часто меняющихся мелких файлов (профили браузера, сборки), не обязательно для образов/VM.

**Пример строки fstab:**
```bash
UUID=<uuid> / btrfs subvol=@,noatime,ssd,space_cache=v2,discard=async,compress=zstd:3,autodefrag 0 0
```

## Планировщик ввода-вывода
- **NVMe/современные SSD:** `none`
- **Старые контроллеры SATA:** `mq-deadline`

Проверка/установка (пример для nvme0n1):
```bash
cat /sys/block/nvme0n1/queue/scheduler
echo none | sudo tee /sys/block/nvme0n1/queue/scheduler
```

## TRIM (fstrim)
Проверь статус и включи периодический TRIM:
```bash
sudo systemctl status fstrim.timer
sudo systemctl enable --now fstrim.timer
```

## Советы
- Для подкаталогов с большими файлами (VM, контейнеры, образы) лучше отдельный subvolume **без** `compress` и часто **без** `autodefrag`.
- Снапшоты не заменяют бэкапы — держите резервные копии отдельно.

---
