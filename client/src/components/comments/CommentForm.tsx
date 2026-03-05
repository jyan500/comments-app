import React, {useState, useEffect} from "react"
import { useAddCommentMutation, useUpdateCommentMutation } from "../../services/public/comment"
import type { Comment } from "../../types/common"
import { Button } from "../page-elements/Button"

interface Props {
	isEdit?: boolean
	setIsEdit?: (isEdit: boolean) => void
	comment: Comment
}

export interface FormValues {
	id?: number 
	text: string
}

interface ErrorState {
	text: {
		error: boolean
		message: string
	}
}

export const CommentForm = ({isEdit, setIsEdit, comment}: Props) => {
	const [addComment, {isLoading: isAddCommentLoading}] = useAddCommentMutation()
	const [updateComment, {isLoading: isUpdateCommentLoading}] = useUpdateCommentMutation()
	const defaultForm = {
		...(comment?.id ? {
			id: comment.id
		} : {}),
		text: comment?.text ?? ""
	}
	const defaultErrorState = {
		text: {
			error: false,
			message: "Please insert text before submitting."
		}
	}
	const [errors, setErrors] = useState<ErrorState>(defaultErrorState)

	const [form, setForm] = useState<FormValues>(defaultForm)

	useEffect(() => {
		/* reset form values and errors if toggling between edit/read states */
		if (isEdit){
			setForm(defaultForm)
			setErrors(defaultErrorState)
		}
	}, [isEdit])

	const onSubmit = async () => {
		// comment cannot be empty
		if (form.text === ""){
			setErrors({
				...errors,	
				text: {
					...errors.text,
					error: true,
				}
			})
			return
		}
		// clear up all errors if validation is passed
		setErrors(Object.keys(errors).reduce((acc, key: keyof typeof ErrorState) => {
			acc[key] = {
				...errors[key],
				error: false
			}
			return acc
		}, {}))

		try {
			if (form.id){
				await updateComment(form).unwrap()
			}
			else {
				await addComment(form).unwrap()
			}
			if (setIsEdit){
				setIsEdit(false)
			}
			// reset text if submitting a new comment
			if (!form.id){
				setForm(defaultForm)
			}
		}
		catch (e){
			console.error(e)
		}
	}

	const onCancel = () => {
		if (setIsEdit){
			setIsEdit(false)
		}
		// if the user cancels their edit, set the text back to the original comment's text
		setForm(defaultForm)
	}

	const onChangeText = (value: string) => {
		setForm({
			...form,
			text: value
		})
	}

	return (
		<form onSubmit={async (e) => {
			e.preventDefault()
			await onSubmit()
		}}>
			<textarea
				name="comment-text"
				className="w-full p-3 border border-gray-300 rounded-md resize-none"
				onChange={(e) => {
					onChangeText(e.target.value)
				}}
				value={form.text}
				rows="4"
				placeholder="Enter your comments..."
			></textarea>
			<div className={"flex flex-row gap-x-4"}>
				<Button disabled={isAddCommentLoading || isUpdateCommentLoading} type="submit" theme="primary">Submit</Button>
				{
					<Button onClick={(e) => {
						e.preventDefault()
						onCancel()
					}} theme="secondary">{comment?.id ? "Cancel" : "Clear"}</Button>
				}
			</div>
			<>
				{
					/* Display error message for submitting new comment, or when editing an existing comment */
					(isEdit || !comment) && errors.text.error ?
						<p className={"text-sm text-red-400"}>{errors.text.message}</p> 
					: null 
				}
			</>
		</form>
	)

}