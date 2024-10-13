# Проект Мессенджер

Это учебный проект мессенджера, целью которого является изучение и применение ключевых технологий веб-разработки,
включая реализацию реального времени, шаблонизацию и современные методологии CSS.

- [Макет проекта в Figma](https://www.figma.com/proto/nQjgrOrJ6mcyfwhopwK6S2/Messanger?node-id=40-625&t=QXz8PHXTqtCWdBsw-1)
- [Деплой проекта](https://messanger-nidal1992.netlify.app/)

### Ссылки на страницы

- [Страница авторизации](https://messanger-nidal1992.netlify.app/)
- [Страница регистрации](https://messanger-nidal1992.netlify.app/demonstrate-routes/register/)
- [Страница со списком чатов](https://messanger-nidal1992.netlify.app/demonstrate-routes/main-page/)
- [Страница с информацией о пользователе](https://messanger-nidal1992.netlify.app/demonstrate-routes/settings-profile/)
- [Страница редактирования данных пользователя](https://messanger-nidal1992.netlify.app/demonstrate-routes/settings-edit/)
- [Страница изменения пароля](https://messanger-nidal1992.netlify.app/demonstrate-routes/change-password-page/)
- [Страница 404](https://messanger-nidal1992.netlify.app/demonstrate-routes/error-404/)
- [Страница 500](https://messanger-nidal1992.netlify.app/demonstrate-routes/error-500/)

## Возможности

- **Обмен сообщениями в реальном времени** с использованием WebSocket.
- **Адаптивный дизайн** для удобного использования на разных устройствах.
- **Шаблонизация** с помощью Handlebars.
- **Модульный и масштабируемый CSS** с использованием SCSS и PostCSS.
- **Методология БЭМ** для структурированной и понятной системы классов CSS.

## Технологии

- **WebSocket**: Используется для обеспечения обмена сообщениями в реальном времени между клиентом и сервером.
- **Handlebars**: Шаблонизатор для создания динамических представлений.
- **SCSS**: Препроцессор CSS, который добавляет гибкость и возможности в CSS.
- **PostCSS**: Инструмент для обработки CSS с помощью плагинов на JavaScript (например, автопрефиксер).
- **БЭМ (Блок, Элемент, Модификатор)**: Методология для организации CSS-классов в структурированную и поддерживаемую
  систему.

## Начало работы

### Предварительные требования

Убедитесь, что у вас установлен Node.js.

### Установка

1. Склонируйте репозиторий:

```bash
git clone https://github.com/your-username/messenger-project.git
```

2. Перейдите в директорию проекта:

```bash
cd messenger-project
```

3. Установите зависимости:

```bash
npm install
```

### Запуск приложения

Для запуска проекта:

```bash
npm run start
```

Для запуска проекта в режиме разработки:

```bash
npm run dev
```

Проект будет запущен по адресу http://localhost:3000.

### Сборка проекта

```bash
npm run build
```

Это создаст оптимизированную версию проекта в папке dist.
