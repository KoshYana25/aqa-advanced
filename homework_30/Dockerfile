FROM cypress/included:13.6.0

# Встановлення необхідних пакетів
WORKDIR /app
# створення папки
RUN mkdir -p app


ENV APP_HOME /app


# Копіювання файлів проекту
COPY . .

#видалення файлів які не потрібні в контейнері
RUN rm package-lock.json && rm -rf node_modules


RUN npm install


# Команда для запуску тестів
CMD ["npx", "cypress", "run"]