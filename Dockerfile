FROM nginx:alpine

ARG workdir=/
ARG APPDIR
VOLUME ${workdir}
WORKDIR ${workdir}

COPY ${APPDIR} /usr/share/nginx/html/

EXPOSE ${PORT}
