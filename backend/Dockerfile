FROM python:3.12-bookworm

RUN apt update
RUN apt install -y gcc build-essential cmake

COPY ./server /app/server
COPY ./requirements.txt /app
COPY ./docker/fastapi-docker-config.py /app/server/Config.py

WORKDIR /app

RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "server.app:app",  "--host", "0.0.0.0", "--port", "8000"]
