import React, {useState} from "react"
import { Container } from "../components/page-elements/Container"
import { CommentForm } from "../components/comments/CommentForm"
import { CommentContainer } from "../components/comments/CommentContainer"
import { Button } from "../components/page-elements/Button"
import { 
	useGetCommentsQuery,
	useAddCommentMutation,
	useUpdateCommentMutation,
	useDeleteCommentMutation,
} 
from "../services/public/comment"

export const CommentPage = () => {
	const {data, isLoading} = useGetCommentsQuery({})
	return (
		<Container>
			<h1 className = "font-bold text-xl">Comments</h1>	
			<Container className = "w-full lg:w-1/2" theme = "bordered">
				<CommentForm/>
			</Container>
			{
				data?.data.map((comment) => {
					return (
						<CommentContainer key={comment.id} comment={comment}/>
					)
				})
			}
		</Container>
	)
}