const db = require("../db/db")
const { validateKeyExists } = require("./helper")
const { body, param } = require("express-validator")

const commentValidator = (actionType) => {
	let validationRules = []
	// if update or delete route, validate the ID and make sure ticket exists
	if (actionType === "get" || actionType === "update" || actionType === "delete"){
		validationRules = [
			param("commentId").notEmpty().withMessage("comment id is required").
			custom(async (value, {req}) => await validateKeyExists("id", value, "comments"))
		]
	}
	if (actionType === "create" || actionType === "update"){
		validationRules = [
			...validationRules,
			body("text").notEmpty().withMessage("text is required"),
		]
	}
	return validationRules
}

module.exports = {
	validateGet: commentValidator("get"),
	validateCreate: commentValidator("create"),
	validateUpdate: commentValidator("update"),
	validateDelete: commentValidator("delete"),
}
