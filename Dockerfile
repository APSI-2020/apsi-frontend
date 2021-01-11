FROM node:13.12.0-alpine as build

# build environment
ENV WORKSPACE="/rosa/app/"
ENV PATH $WORKSPACE/node_modules/.bin:$PATH

WORKDIR $WORKSPACE

COPY package.json ./
COPY package-lock.json ./

RUN npm ci 
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

ARG REACT_APP_BACKEND_BASE_URL
ENV REACT_APP_BACKEND_BASE_URL=$REACT_APP_BACKEND_BASE_URL

RUN npm run build

# production environment
FROM nginx:stable-alpine

RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=build /rosa/app/build /usr/share/nginx/html

EXPOSE 80

WORKDIR /usr/share/nginx/html
COPY ./env.sh .
COPY .env .

RUN chmod +x env.sh

CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
