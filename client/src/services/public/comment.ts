import type { Comment, ListResponse } from "../../types/common"
import { publicApi } from "../public"
import { COMMENT_URL } from "../../helpers/urls"

interface AddCommentPayload {
	text: string
}

interface UpdateCommentPayload {
	id: number
	text: string
}

interface ResponsePayload {
	message: string	
}

export const commentApi = publicApi.injectEndpoints({
	overrideExisting: false,
	endpoints: (builder) => ({
		getComments: builder.query<ListResponse<Comment>, Record<string, any>>({
			query: (urlParams) => ({
				url: COMMENT_URL,
				method: "GET",
				params: urlParams,
			}),
			providesTags: ["Comments"]
		}),
		addComment: builder.mutation<ResponsePayload, AddCommentPayload>({
			query: ({text}) => ({
				url: COMMENT_URL,
				method: "POST",
				body: {
					text
				}
			}),
			invalidatesTags: ["Comments"]
		}),
		updateComment: builder.mutation<ResponsePayload, UpdateCommentPayload>({
			query: ({id, text}) => ({
				url: `${COMMENT_URL}/${id}`,
				method: "PUT",
				body: {
					id, text
				}
			}),
			invalidatesTags: ["Comments"]
		}),
		deleteComment: builder.mutation<ResponsePayload, number>({
			query: (id) => ({
				url: `${COMMENT_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Comments"]
		}),
	})
})

export const { 
	useGetCommentsQuery,
	useAddCommentMutation,
	useUpdateCommentMutation,
	useDeleteCommentMutation,
} = commentApi 
