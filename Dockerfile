FROM nginx:alpine

ARG workdir=/app
ARG APPDIR
VOLUME ${workdir}
WORKDIR ${workdir}

ADD ${APPDIR} app.jar

EXPOSE ${PORT}
