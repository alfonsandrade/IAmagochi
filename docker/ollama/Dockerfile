FROM ollama/ollama

ENV APP_HOME=/home

WORKDIR $APP_HOME

COPY . .

RUN chmod +x pull-llama3.sh

ENTRYPOINT ["/usr/bin/bash", "pull-llama3.sh"]
