import Knex from 'knex'

export async function seed(knex: Knex) {
    await knex('logs').insert([
        {error: 'not-found', route: '/clima-tempo', description: ''},
    ])
}