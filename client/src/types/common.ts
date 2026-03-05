export interface Comment {
	id: number
	author: string
	text: string
	likes: number
	image?: string
	createdAt: Date
	updatedAt: Date
}

export interface IPagination {
	total?: number
	lastPage?: number
	prevPage?: number
	nextPage?: number
	currentPage: number
	perPage: number
	from: number
	to: number
}

export interface ListResponse<T> {
	pagination: IPagination
	data: Array<T>
}

export interface CustomError {
	data: Record<string, Array<string>>
	status: number
}