/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
	return knex.schema.createTable("comments", (table) => {
		table.increments("id").primary()
		table.text("text").notNullable()
		table.string("author").notNullable()
		table.string("image").notNullable()
		table.integer("likes").notNullable()
 		table.timestamp('date').notNullable().defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
	})	 
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 	return knex.schema.dropTableIfExists("comments") 
};
