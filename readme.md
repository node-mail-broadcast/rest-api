# mail-rest




## Usage with Docker


### Environment Variablen

| env variable | Description                      | Default-Value | Required? |
|--------------|----------------------------------|---------------|-----------|
| DB_HOST      | Database Host for `mongodb`      | `localhost`   | No        |
| DB_PORT      | Database Port for `mongodb`      | `27017`       | No        |
| DB_DB        | Database Name for `mongodb`      | `mail-rest`   | No        |
| DB_USER      | Database User for `mongodb`      | `mail-rest`   | No        |
| DB_PASSWD    | Database Password for `mysql`    |               | **Yes**   |
| RABBIT_IP    | RabbitMQ Host                    | `127.0.0.1`   | No        |
| RABBIT_PORT  | RabbitMQ Port                    | `5672`        | No        |
| RABBIT_QUEUE | RabbitMQ Queue for email sending | `emails`      | No        |

&copy; 2023
