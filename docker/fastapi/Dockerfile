FROM python:3.11-slim AS base

RUN apt-get update -y && apt-get install -y \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

ENV APP_HOME /app
WORKDIR $APP_HOME

COPY . ./

RUN pip install -r requirements.txt

CMD exec uvicorn app:app --host "0.0.0.0" --port 5005
