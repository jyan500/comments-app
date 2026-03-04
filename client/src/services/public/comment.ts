import { createApi, fetchBaseQuery } from "@reduxjs/toolkit"
import type { Comment, ListResponse } from "../../types/common"
import { publicApi } from "../public"
import { COMMENT_URL } from "../../helpers/urls"
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
	})
})