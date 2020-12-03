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

RUN npm run build

# production environment
FROM nginx:stable-alpine

COPY --from=build /rosa/app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
