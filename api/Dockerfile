FROM php:7.4-apache

RUN apt-get update && apt-get install -y libzip-dev
RUN docker-php-ext-install zip

RUN apt-get update && apt-get install -y \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libxml2-dev \
        libpng-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd

RUN pecl install -o -f redis \
&&  rm -rf /tmp/pear \
&&  docker-php-ext-enable redis


RUN docker-php-ext-install soap

RUN apt-get update && \
    apt-get install -y apt-utils freetds-dev sendmail libpng-dev zlib1g-dev

# zip, socket, mbstring
RUN docker-php-ext-install zip sockets 
RUN  apt-get update && apt-get install -y zip


RUN apt-get update && apt-get install -y gnupg2
ENV ACCEPT_EULA=Y
ARG DEBIAN_FRONTEND=noninteractive
RUN apt-get install libaio1

RUN docker-php-ext-install pdo pdo_mysql 

RUN apt-get update && apt-get install -y libpq-dev && docker-php-ext-install pdo

#vim
RUN apt-get install vim -y && apt-get install nmap -y

# RUN docker-php-ext-install pdo_dblib
RUN docker-php-ext-install zip

# Copy over the php conf
COPY docker-conf/docker-php.conf /etc/apache2/conf-enabled/docker-php.conf

# Copy over the php ini
COPY docker-conf/docker-php.ini $PHP_INI_DIR/conf.d/

# Set the timezone
ENV TZ=America/America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN printf "log_errors = On \nerror_log = /dev/stderr\n" > /usr/local/etc/php/conf.d/php-logs.ini

# Enable mod_rewrite
RUN a2enmod rewrite

#RUN pecl install PDO_DBLIB

# Install Composer
ENV COMPOSER_HOME /composer
ENV PATH ./vendor/bin:/composer/vendor/bin:$PATH
ENV COMPOSER_ALLOW_SUPERUSER 1
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer --version

# Add the files and set permissions
WORKDIR /var/www/html
ADD . /var/www/html

RUN chown -R www-data:www-data /var/www/html

EXPOSE 80