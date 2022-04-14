---
layout: post
author: Valeria
title: "postgresql initial setup"
date: 2022-04-13
categories: coding
---

Every time you start a new project you find yourself setting up postgresql, and
since it had been a while since you done it last, you forgot how to do it.

Here's some notes on how to set things up, initially:
1. First of all, useful documentation for [postgresql 14, tutorial](https://www.postgresql.org/docs/14/tutorial.html).
1. Make sure your version of postgresql is updates in your system especially
  if you haven't used it in a while. At the time of writing this post, the latest version is 14.
  run `brew postgresql-upgrade-database` and check that all the versions are matching to the
  latest, if you have more than one version.
1. Go here `cd /usr/local/var/postgres` and see that if you `cat PG_VERSION` you see 14.
1. If for your project it doesn't mater which version you use, get the latest available.
1. Run it, and keep it running: `brew services run postgresql`
1. If you don't already have a user, create it using `createuser yourname`.
Otherwise go ahead and access the psql console with `psql`
1. If you run these commands from OUTISDE the postegresql console use those commands like
`createdb foo`, if you are INSIDE the psql console then use those SQL commands like:
```sql
CREATE DATABASE foo;
```
1. About SQL commands:
    1. it DOES NOT matter that they in caps,
    1. it DOES matter that you use single quotes,
        because double-quotes are for comparison of equality in strings for example,
    1. and REMEMBER to put a semicolon `;` at the end of your string,
        if you wanna go multiline, use a backspace `\`
1. Same for the table and pass the schema in parenthesis:
  ```sql
  CREATE TABLE songs (id bigint, artist varchar(80), title varchar(100), duration int);
  ```
1. Populate the table with seed data from the psql console, for fun and learning experience.
  As a (mostly) Rails developer I tend to have all the model/controller/database/routes setup
  that takes care of this, and I use a postgres client for queries (GET) but not to POST or
  I should say INSERT in a table.
  Or I occasionally have to write SQL statements in Ruby code, but this is for fun and learning.
1. Different ways to insert data:
    1. with implicit order of the columns (less cool)
    ```sql
    INSERT INTO songs VALUES (1, 'Ramones', 'Questioningly', 120);
    ```
    1. with explicit reference to the schema and columns
    ```sql
    INSERT INTO songs(id, artist, title, duration) VALUES (1, 'Ramones', 'Questioningly', 120);
    ```
    1. import a txt or csv file, still I wouldn't use a txt file in production for a real app.
    `COPY` is a good command to keep in mind in your toolchain in your brain, to be used
    sporadically but it's useful especially to quickly ingest a lot of data in bulk uploads,
    or like, my friend [Jeff](https://github.com/jeffreyfriedman) pointed out, they say
    [in this article](https://www.citusdata.com/blog/2017/11/08/faster-bulk-loading-in-postgresql-with-copy/):

    > [...] you can achieve much higher throughput than with single row inserts.

    > [...] each insert is a transaction.

    > The `copy` mechanism gives a way to bulk load data in an even more performant manner [...]

    > By batching our inserts into a single transaction, we saw our throughput go higher.


    ```sql
    COPY songs FROM 'path/to/file/songs.csv' DELIMITER ',';
    ```
    Notes: don't use spaces in the csv file, don't use quotes in the csv file for strings,
    YES, there was no `id` column, Rails migrations give you free `id`, and `created_at` timestamp
    that you don't get here in the raw world of postgres tables.
    1. my import failed validation cause one value exceeded the limit of the acceptable string,
    and aborted the import. Since this is a toy app, I can mess around, and make it longer:
    ```sql
    ALTER TABLE songs ALTER COLUMN artist TYPE varchar(90);
    ```
    The import of seed data was successful, now I can go back to my app.
