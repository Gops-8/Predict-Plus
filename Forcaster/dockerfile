FROM python:3.7-stretch

RUN apt-get -y install libc-dev

RUN pip install pip==19.1.1

ENV VIRTUAL_ENV=TEST
ENV PATH $VIRTUAL_ENV/bin:$PATH
RUN python3 -m venv $VIRTUAL_ENV

RUN echo "Virtual ENv Created "

COPY . /usr/app/
EXPOSE 8000
WORKDIR /usr/app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
RUN echo "All requirements Installed"
CMD python app.py