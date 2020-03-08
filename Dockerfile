FROM nginx:alpine

ARG APPDIR
COPY ${APPDIR} /usr/share/nginx/html/

EXPOSE ${PORT}
