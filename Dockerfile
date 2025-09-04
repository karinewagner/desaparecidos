# Etapa 1: build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependência e instalar
COPY package.json package-lock.json* ./
RUN npm install

# Copiar código do projeto e buildar
COPY . .
RUN npm run build

# Etapa 2: servir com Nginx
FROM nginx:stable-alpine

# Remover config padrão e copiar nosso build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuração customizada do Nginx para SPA (redireciona 404 -> index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
