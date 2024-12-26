FROM mcr.microsoft.com/playwright:v1.49.0-noble

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо файли проекту
COPY . .


RUN npm install

#видалення файлів які не потрібні в контейнері
RUN rm package-lock.json && rm -rf node_modules

CMD ["npx", "playwright", "test", "--headless", "--project='Firefox'"]