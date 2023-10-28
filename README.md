A blog app using Nextjs and MySQL

## Development

- First, using docker to init MYSQL database
```bash
docker compose up
```
NOTE: Port number is at 3308, you can use Workbench to check whether it's fired up correctly

In case it doesn't work, do this:

```bash
docker ps
```
Suppose the first 3 characters of the process id is `abc`

```bash
docker exec -it abc bash

mysql -u root -p
```

Look up the docker-compose file for password!!! Then
```
update mysql.user set host='%' where user = 'root';
```

Re-run the docker, and you might be good to go

- Second

```
npm i
npm run dev
```
