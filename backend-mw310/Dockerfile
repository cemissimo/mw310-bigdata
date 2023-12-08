FROM python:3.11.6

WORKDIR /mw310-backend

COPY ./requirements.txt /mw310-backend/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /mw310-backend/requirements.txt

COPY ./src /mw310-backend/src

ENV PYTHONPATH=/mw310-backend/src

CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]