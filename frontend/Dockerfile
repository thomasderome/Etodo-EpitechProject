FROM node:24-alpine

WORKDIR /frontend
COPY . .

ARG NEXT_PUBLIC_HOST_API
ENV NEXT_PUBLIC_HOST_API=${NEXT_PUBLIC_HOST_API}

RUN rm -rf .next out
RUN npm install
RUN npm run build
CMD ["npm", "run", "start"]