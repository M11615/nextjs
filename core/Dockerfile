FROM python:3.14-slim

WORKDIR /opt/nextjs

COPY ./core/requirements.txt .

RUN mkdir src
COPY ./core/src ./src

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    g++ \
    cargo \
    && rm -rf /var/lib/apt/lists/*

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
