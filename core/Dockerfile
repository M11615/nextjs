FROM python:3.13-slim

WORKDIR /opt/nextjs

COPY ./core/requirements.txt .

RUN mkdir .wheelhouse
COPY ./core/.wheelhouse ./.wheelhouse

RUN mkdir .models
COPY ./core/.models ./.models

RUN mkdir src
COPY ./core/src ./src

RUN pip install --no-index --find-links=./.wheelhouse -r ./requirements.txt

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
