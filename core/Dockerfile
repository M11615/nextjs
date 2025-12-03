FROM python:3.14-slim

WORKDIR /opt/nextjs

COPY ./core/requirements.txt .

RUN mkdir .venv
COPY ./core/.venv ./.venv

RUN mkdir src
COPY ./core/src ./src

EXPOSE 8000

ENV PATH="/opt/nextjs/.venv/bin:$PATH"
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
