FROM python:3.14-slim

WORKDIR /opt/nextjs

COPY ./core/requirements.txt .

RUN mkdir .wheelhouse
COPY ./core/.wheelhouse ./.wheelhouse

RUN mkdir src
COPY ./core/src ./src

RUN pip install --find-links=./.wheelhouse -r ./requirements.txt

EXPOSE 8000

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
