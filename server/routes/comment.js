const express = require("express")
const router = express.Router()
const { 
	validateGet,
	validateCreate, 
	validateUpdate, 
	validateDelete,
}  = require("../validation/comment")
const { handleValidationResult }  = require("../middleware/validationMiddleware")
const { insertAndGetId } = require("../helpers/functions")
const db = require("../db/db")
const { PER_PAGE } = require("../helpers/constants")

router.get("/", async (req, res, next) => {
	try {
		const comments = await db("comments")
		.select(
			"id",
			"author",
			"text",
			"likes",
			"image",
			"created_at as createdAt",
			"updated_at as updatedAt",
		)
		.orderBy("created_at", "desc")
		.paginate({page: req.query.perPage ?? PER_PAGE, currentPage: req.query.page ? parseInt(req.query.page) : 1, isLengthAware: true})
		res.json(comments)
	}
	catch (err) {
		console.error(`Error while getting comments: ${err.message}`)	
		next(err)
	}
})

router.get("/:commentId", validateGet, handleValidationResult, async (req, res, next) => {
	try {
		const comment = await db("comments").where("id", req.params.commentId).first()
		res.json(comment)
	}	
	catch (err) {
		console.error(`Error while getting comment: ${err.message}`)	
		next(err)
	}
})

router.post("/", validateCreate, handleValidationResult, async (req, res, next) => {
	try {
		await insertAndGetId("comments", {
			/* TODO: currently hardcoded as we assume we're updating only as admin */
			author: "Admin",
			text: req.body.text,
			likes: 0,
			image: "",
		})
		res.json({message: "Comment created successfully!"})
	}	
	catch (err) {
		console.error(`Error while creating comment: ${err.message}`)	
		next(err)
	}
})

router.put("/:commentId", validateUpdate, handleValidationResult, async (req, res, next) => {
	try {
		await db("comments").update({
			text: req.body.text,	
		}).where("id", req.params.commentId)
		res.json({message: "Comment updated successfully!"})
	}
	catch (err){
		console.error(`Error while updating comment: ${err.message}`)
		next(err)
	}
})

router.delete("/:commentId", validateDelete, handleValidationResult, async (req, res, next) => {
	try {
		await db("comments").where("id", req.params.commentId).del()
		res.json({message: "Comment deleted successfully!"})
	}
	catch (err){
		console.error(`Error while deleting comment: ${err.message}`)
		next(err)
	}
})

module.exports = router
