## How To Run

1.  Clone the repo locally:

    `$ git clone git@github.com:jyan500/comments-app.git`

2. Ensure that you have `node` and `npm` installed locally,
   as well either MySQL or PostgreSQL for the backend.
   (My local has node `v22.17.1`, npm `v6.14.8`, and MySQL `5.7`)

3. Complete the steps for server side first, then the client side after.


### Server Side

1. Enter folder where the server code is located:

    `$ cd server`

2. Install Dependencies

    `$ npm install`

3. Install knex locally, this is the database driver allowing interaction between node.js and your DB.

    ```
    $ npm install knex --save
    ```

    Then add one of the following (adding a --save) flag:
    ```
    $ npm install pg
    $ npm install mysql2
    ```

    Test if it was installed properly:
    ```
    $ knex
    ```
    should show a list of options on the terminal instead of "knex not found"

4. In the root of the server folder, create a `.env` file with the following:

    ```
    DB_CLIENT = mysql2
    DB_HOST = localhost
    DB_USER = <your DB user>
    DB_PASSWORD = <your DB password>
    DB_NAME = comments_app 
    PORT = 8000 
    ```

    Note that **you should replace** `mysql2` with `pg` if you are using **PostgreSQL** locally rather than **MySQL**.

    Localhost should be replaced with the name of your db host (if it's not localhost)

5. Open your local DB management app (i.e MySQL workbench) or via the command line
   and create a new schema:

    ```
    CREATE SCHEMA `comments_app`;
    USE `comments_app`
    ```

6. Run the migrations and seeds to setup the DB after creating the new schema:

    ```
    $ knex migrate:latest
    $ knex seed:run
    ```

7. To run the server:

    ```
    $ nodemon index.js
    ```


### Client Side

1. Enter folder where the frontend code is located:

    `$ cd client`

2. Install Dependencies:

    `$ npm install`

3. In the root of the client folder, create a `.env` file with the following:

    ```
    VITE_BACKEND_API_URL = "http://localhost:8000"
    ```

4. Run development environment:

    `$ npm run dev`

### Requirements:

[Instructions](https://docs.google.com/document/d/1PFD93C7j4qed6-Wm0Nyhzl50oPbquk5M7io4e3Gk4o8/edit?tab=t.0#heading=h.j6z79psm1ev8)