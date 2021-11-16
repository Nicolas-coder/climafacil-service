import Knex from 'knex';


export async function up(knex: Knex) {
    // Criar a tabela
    return knex.schema.createTable('logs', table => {
        table.increments('id').primary();
        table.string('error').notNullable();
        table.string('route').notNullable();
        table.string('description').notNullable();
    })
}

export async function down(knex: Knex) {
    // Voltar atras (deletar a tabela)
    return knex.schema.dropTable('logs');
}