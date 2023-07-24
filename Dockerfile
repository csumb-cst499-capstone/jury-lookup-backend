FROM node:current-slim
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
COPY package*.json ./
RUN npm install
# Bundle app source
COPY . .
ARG DATABASE_URL
ARG JWT_SECRET
ARG LOG_LEVEL=debug
ARG LOGTAIL_SOURCE_TOKEN
ARG PORT

# Add environment variables
ENV DATABASE_URL=DATABASE_URL
ENV JWT_SECRET=JWT_SECRET
ENV LOG_LEVEL=LOG_LEVEL
ENV LOGTAIL_SOURCE_TOKEN=LOGTAIL_SOURCE_TOKEN
EXPOSE 8080
CMD [ "npm", "start" ]
