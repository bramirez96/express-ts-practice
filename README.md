# Node TS Test Repo

## DB Initialization

To run the application, you need databases set up. I prefer running local Docker containers, as it comes with PGAdmin, giving you access to and control over the data in the database.

Regardless of the method you use, make sure that the `DB_URL` in your `.env` file is pointing to the database you create.

### Docker

This project includes a `docker-compose` file, so, assuming you have Docker installed on your machine, all you need to get the project up and running is to run the following command:

```bash
docker-compose up -d
```

> `up` creates the Docker containers and the `-d` flag allows the newly-created containers to run in the background so they don't take up a terminal

### Other PG Instance

You can also create your own postgres database on your local machine using whatever other program you'd like, or, alternatively, use an online-hosted PG database.
