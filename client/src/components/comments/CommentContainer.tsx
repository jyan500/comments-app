import React, { useState, useEffect } from "react"
import { Container } from "../page-elements/Container"
import { Button } from "../page-elements/Button"
import type { Comment } from "../types/common"
import { useDeleteCommentMutation } from "../../services/public/comment"
import { CommentForm } from "./CommentForm"
import { Heart } from "lucide-react"
import { Pencil } from 'lucide-react';
import { Trash } from 'lucide-react';


interface Props {
	comment?: Comment
}

export const CommentContainer = ({comment}: Props) => {
	const [isEdit, setIsEdit] = useState(false)
	const [deleteComment, {isLoading: isDeleteCommentLoading}]= useDeleteCommentMutation()

	const onDelete = async (id: number) => {
		try {
			await deleteComment(id).unwrap()
		}
		catch (e){
			console.error(e)
		}
	}

	return (
		<Container className = "w-full lg:w-1/2" theme={"bordered"}>
			<div className = "flex flex-row justify-between gap-x-2">
				<h1 className={"font-semibold"}>{comment.author}</h1>	
				<div className = "flex flex-row gap-x-2">
					<button onClick={() => {
						setIsEdit(!isEdit)
					}} className="hover:opacity-60 cursor-pointer"><Pencil/></button>
					<button className="hover:opacity-60 cursor-pointer" onClick={async () => {
							await onDelete(comment.id)
						}}><Trash className = "w-6 h-6 text-red-500"/></button>
				</div>
			</div>
			<h2 className="italic">{new Date(comment.updatedAt).toLocaleString("en-US")}</h2>
			<div className = "w-full flex flex-row gap-x-4 items-start border border-gray-200 text-wrap p-2 overflow-y-auto">
				{
					comment.image !== "" ? <img className = "object-fit w-48 h-48" src={comment.image} alt={comment.image}/> : <></>
				}
				{
					<div className = "flex flex-1 flex-col gap-y-2 max-h-48 overflow-y-auto">
						<>
							{!isEdit ? 
								<p>{comment.text}</p> :
								<CommentForm isEdit={isEdit} setIsEdit={setIsEdit} comment={comment}/>								
							}
						</>
					</div>
				}
			</div>
			{
				<div className = "flex flex-row item-center gap-x-2">
					<Heart className="w-6 h-6 text-red-500" />
					<p className = "font-semibold text-red-500">{comment.likes}</p>
				</div>
			}
		</Container>
	)
}