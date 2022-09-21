FROM node
# python,sphinxなどのインストール
RUN apt-get update \
	&& apt-get install python3 \
	&& apt-get install python3-pip -y \
	&& pip3 install --upgrade pip \
	&& pip3 install -U sphinx
# 作業場所(ディレクトリ)の指定
WORKDIR /usr/src/app
# gulpなどをインストール
RUN npm i -g gulp \
	&& npm i browser-sync \
	&& npm link gulp

