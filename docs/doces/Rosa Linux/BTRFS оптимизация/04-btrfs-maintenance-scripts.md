---
title: Скрипты и таймеры для обслуживания Btrfs
sidebar_position: 4
description: Готовый скрипт и systemd-таймеры для автоматической балансировки и scrub.
---

Автоматизируйте регулярное обслуживание Btrfs при помощи скрипта и двух таймеров: еженедельная балансировка и ежемесячный scrub.

## Скрипт `/usr/local/sbin/btrfs-maintenance.sh`
```bash
#!/usr/bin/env bash
set -euo pipefail
MOUNTPOINT="/"
IONICE="ionice -c3"
NICE="nice -n 19"

log() { echo "[btrfs-maintenance] $(date -Iseconds) $*"; }

# Лёгкая балансировка
log "Starting balance (-dusage=75 -musage=75) on ${MOUNTPOINT}"
${IONICE} ${NICE} btrfs balance start -dusage=75 -musage=75 ${MOUNTPOINT}

# По флагу выполняем scrub
if [[ "${1:-}" == "--scrub" ]]; then
  log "Starting scrub on ${MOUNTPOINT}"
  ${IONICE} ${NICE} btrfs scrub start -B -d -R ${MOUNTPOINT}
fi

log "Done"
```
Сделайте исполняемым:
```bash
sudo install -Dm755 btrfs-maintenance.sh /usr/local/sbin/btrfs-maintenance.sh
```

## Unit-файлы systemd

### Служба балансировки `/etc/systemd/system/btrfs-balance.service`
```ini
[Unit]
Description=Weekly Btrfs light balance (NVMe/SSD/HDD-friendly)
After=local-fs.target
RequiresMountsFor=/

[Service]
Type=oneshot
ExecStart=/usr/local/sbin/btrfs-maintenance.sh
Nice=19
IOSchedulingClass=idle
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes
NoNewPrivileges=yes
```

### Таймер балансировки `/etc/systemd/system/btrfs-balance.timer`
```ini
[Unit]
Description=Run Btrfs balance weekly

[Timer]
OnCalendar=Sun *-*-* 03:15:00
RandomizedDelaySec=1h
Persistent=true

[Install]
WantedBy=timers.target
```

### Служба scrub `/etc/systemd/system/btrfs-scrub.service`
```ini
[Unit]
Description=Monthly Btrfs scrub (integrity check)
After=local-fs.target
RequiresMountsFor=/

[Service]
Type=oneshot
ExecStart=/usr/local/sbin/btrfs-maintenance.sh --scrub
Nice=19
IOSchedulingClass=idle
ProtectSystem=strict
ProtectHome=yes
PrivateTmp=yes
NoNewPrivileges=yes
```

### Таймер scrub `/etc/systemd/system/btrfs-scrub.timer`
```ini
[Unit]
Description=Run Btrfs scrub monthly

[Timer]
OnCalendar=monthly
AccuracySec=1h
RandomizedDelaySec=2h
Persistent=true

[Install]
WantedBy=timers.target
```

## Активация и проверка
```bash
sudo systemctl daemon-reload
sudo systemctl enable --now btrfs-balance.timer btrfs-scrub.timer
systemctl list-timers | grep btrfs
```

## Ручной запуск и логи
```bash
sudo systemctl start btrfs-balance.service
sudo systemctl start btrfs-scrub.service
sudo journalctl -u btrfs-balance.service -n 50 --no-pager
sudo journalctl -u btrfs-scrub.service -n 50 --no-pager
```

## Кастомизация
- Меняйте `OnCalendar` под свои окна простоя.
- Для HDD сократите частоту балансировки (например, раз в месяц) и используйте меньшие пороги нагрузки.
- Для интенсивных сборок можно временно убрать `autodefrag` на соответствующем subvolume.

## Удаление
```bash
sudo systemctl disable --now btrfs-balance.timer btrfs-scrub.timer
sudo rm -f /etc/systemd/system/btrfs-balance.* /etc/systemd/system/btrfs-scrub.*
sudo systemctl daemon-reload
```

---
