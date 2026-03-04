const express = require("express")
const router = express.Router()
const { 
	validateGet,
	validateCreate, 
	validateUpdate, 
	validateDelete,
}  = require("../validation/comment")
const { handleValidationResult }  = require("../middleware/validationMiddleware")
const db = require("../db/db")

router.get("/", async (req, res, next) => {
	try {
		res.json([])
	}
	catch (err) {
		console.error(`Error while getting comments: ${err.message}`)	
		next(err)
	}
})

router.get("/:commentId", validateGet, handleValidationResult, async (req, res, next) => {
	try {
		res.json([])
	}	
	catch (err) {
		console.error(`Error while getting comment: ${err.message}`)	
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {

	}	
	catch (err) {
		console.error(`Error while getting comment: ${err.message}`)	
		next(err)
	}
})

router.put("/:commentId", validateUpdate, handleValidationResult, async (req, res, next) => {
	try {

	}
	catch (err){
		console.error(`Error while updating comment: ${err.message}`)
		next(err)
	}
})

router.delete("/:commentId", validateDelete, handleValidationResult, async (req, res, next) => {
	try {
		res.json({message: "Comment deleted successfully!"})
	}
	catch (err){
		console.error(`Error while deleting comment: ${err.message}`)
		next(err)
	}
})

module.exports = router
