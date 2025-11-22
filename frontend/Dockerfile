FROM node:24-alpine

WORKDIR /frontend
COPY . .
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]