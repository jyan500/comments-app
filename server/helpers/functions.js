const db = require("../db/db")

/**
 * Inserts a single record and return id
 */
const insertAndGetId = async (tableName, data) => {
	const result = await db(tableName).insert(data, 'id')
	return result[0]?.id ?? result[0]
}

module.exports = {
	insertAndGetId
}