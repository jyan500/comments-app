import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { FetchArgs, BaseQueryFn } from "@reduxjs/toolkit/query/react"
import { BACKEND_BASE_URL } from "../helpers/urls" 
import type { CustomError } from "../types/common" 
import { TAG_TYPES } from "../helpers/constants"

// initialize an empty api service that we'll inject endpoints into later as needed
export const publicApi = createApi({
	reducerPath: "public",
	tagTypes: TAG_TYPES,
	baseQuery: fetchBaseQuery({
		baseUrl: BACKEND_BASE_URL
	}) as BaseQueryFn<string | FetchArgs, unknown, CustomError, {}>,
	endpoints: () => ({}),
})