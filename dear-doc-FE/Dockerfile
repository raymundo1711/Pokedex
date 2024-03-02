# Etapa de construcción
FROM node:18 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa de producción
FROM nginx:alpine
COPY --from=build /app/dist/dear-doc-fe /usr/share/nginx/html

# Incluir configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
