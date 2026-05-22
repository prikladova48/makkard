# Исправление v3

Загрузи эти файлы в корень репозитория GitHub с заменой старых:

- index.html
- styles.css
- app.js
- data.js

Что исправлено:

- app.js теперь не ломается, если GitHub или Telegram временно подтянули старый index.html.
- В index.html добавлены версии `?v=3`, чтобы Telegram и браузер не держали старый кэш.
