FROM node:14.21.3-bullseye

WORKDIR /app/fe
COPY package*.json ./
RUN npm install
COPY . .
ENV TZ=Asia/Ho_Chi_Minh
RUN npm run build
RUN npm install -g serve
CMD serve -s build -p 3200
EXPOSE 3200

