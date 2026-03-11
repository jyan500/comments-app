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
import { ChevronDown } from 'lucide-react'
import { ChevronUp } from "lucide-react"

export const CommentPage = () => {
	const [form, setForm] = useState({
		sortBy: localStorage.getItem("sortBy") ?? "id", 
		order: localStorage.getItem("order") ?? "asc",
	})
	const {data, isLoading} = useGetCommentsQuery(form)
	return (
		<Container>
			<h1 className = "font-bold text-xl">Comments</h1>	
			<div className = "flex flex-row items-center gap-x-2">
				<select className = "border border-gray-200" onChange={(e) => {
					setForm({
						...form,
						sortBy: e.target.value
					})
					localStorage.setItem("sortBy", e.target.value)
				}} value={form.sortBy}>
					<option value="id">Id</option>
					<option value="created_at">Created At</option>
				</select>	
				<button onClick={(e) => {
					setForm({
						...form,
						order: form.order === "asc" ? "desc" : "asc"
					})
					localStorage.setItem("order", form.order === "asc" ? "desc" : "asc")
				}}>{form.order === "asc" ? <ChevronUp/> : <ChevronDown/>}</button>
			</div>
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