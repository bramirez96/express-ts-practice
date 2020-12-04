import * as Knex from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (t) => {
    t.increments('id');
    t.string('name', 50).notNullable().index();
    t.string('email', 128).notNullable().unique();
    t.string('password').notNullable();
    t.string('salt').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists('users');
}
