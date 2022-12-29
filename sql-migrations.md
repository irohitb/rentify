## Flow for writing SQL migrations

- write some sql under hasura-backend/sql
- run `scripts/sql-watch` to have the SQL applied as you write it
- run `scripts/sql-migrate` name-of-your-migration when you’re ready to make the migration
