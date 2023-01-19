
FROM node:14.17.4 as client
COPY ./client /client
WORKDIR /client
RUN npm install
RUN npm run build

FROM python:alpine3.17 as server
ARG DATABASE_NAME="kankaku"
ARG DATABASE_USER="kankaku"
ARG DATABASE_PASS="redacted"

RUN pip install --upgrade pip
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev \
    libffi-dev openssl-dev python3-dev

COPY ./mysite /mysite
COPY ./flashcards /flashcards
COPY ./templates /templates
COPY manage.py /manage.py
COPY requirements.txt /requirements.txt
COPY --from=client /client/build /client/build/

RUN python -m venv venv
RUN source venv/bin/activate
ENV CRYPTOGRAPHY_DONT_BUILD_RUST=1
RUN pip install -r requirements.txt
RUN pip install gunicorn

RUN python manage.py migrate --settings mysite.settings_prod
RUN python manage.py collectstatic

EXPOSE 8000
CMD [ "gunicorn", "mysite.wsgi", "-b", "0.0.0.0:8000" ]
