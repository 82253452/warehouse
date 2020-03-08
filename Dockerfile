FROM nginx:alpine

ARG workdir=/app
ARG APPDIR
VOLUME ${workdir}
WORKDIR ${workdir}

ADD ${APPDIR} /usr/share/nginx/html/

EXPOSE ${PORT}
