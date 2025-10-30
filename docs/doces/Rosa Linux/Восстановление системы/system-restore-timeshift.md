---
title: Восстановление системы на ext4 и btrfs
description: Пошаговые инструкции по откату системы в Timeshift для файловых систем ext4 и btrfs.
---

# 🧩 Восстановление системы с помощью Timeshift

**Timeshift** — это инструмент для создания и восстановления системных снимков (snapshots).
Он полезен для быстрого отката после неудачных обновлений, установки драйверов или повреждения конфигурации.

---

## ⚙️ Восстановление на **ext4**

Файловая система `ext4` не поддерживает встроенные snapshots, поэтому Timeshift использует **rsync** для копирования и отката файлов.

## 🔧 Восстановление из работающей системы

1. Открой Timeshift (в GUI или CLI).
2. Посмотри список снимков:
   ```bash
   sudo timeshift --list
Запусти восстановление:

```bash
sudo timeshift --restore --snapshot '2025-10-29_14-00-00'
```
Следуй инструкциям (можно выбрать восстановление без /home).

После завершения — перезагрузи систему.

## 🧱 Восстановление через Live-диск

Если система не загружается:

Загрузись в Live Linux.

Установи Timeshift:

```bash
sudo dnf install timeshift
```

Смонтируй корневой раздел:

```bash
sudo mount /dev/sda2 /mnt
```

Запусти Timeshift с указанием устройства:

```bash
sudo timeshift --snapshot-device /dev/sda2 --restore
```

Выбери нужный snapshot и следуй шагам восстановления.

## 🧬 Восстановление на btrfs

Файловая система **btrfs** поддерживает встроенные snapshots, и Timeshift использует их напрямую.\
Откат выполняется мгновенно без копирования файлов.

🔧 Восстановление из системы\
Список снимков:

```bash
sudo timeshift --list
```

Запусти восстановление:

```bash
sudo timeshift --restore --snapshot '2025-10-29_14-00-00'
```

Перезагрузи систему — она загрузится в состояние snapshot’а.

## 🖥 Ручное восстановление через Live-диск
Если нет GUI или GRUB не отображает snapshots:

Загрузись с Live-диска.

Определи корневой раздел:

```bash
lsblk -f
```

Смонтируй его:

```bash
sudo mount -t btrfs -o subvol=/ /dev/sda2 /mnt
sudo btrfs subvolume list /mnt
```

Найди нужный snapshot (например .snapshots/123/snapshot).

Замени текущий корень на snapshot:

```bash
sudo btrfs subvolume delete /mnt/@
sudo btrfs subvolume snapshot /mnt/.snapshots/123/snapshot /mnt/@
```

Перезагрузи систему.

:::tip Совет
Перед обновлением ядра или установкой драйверов создавай Timeshift-снимок — это экономит часы при восстановлении.
:::
