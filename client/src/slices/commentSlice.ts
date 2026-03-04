import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import type { Comment } from "../types/common"

type CommentState = {
  comments: Array<Comment>
}

const initialState: CommentState = {
	comments: [],
}

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        setComments: (state, {payload: { comments }} : PayloadAction<{ comments: Array<Comment> }>) => {
        	state.comments = comments
        },
    },
})

export const { setComments } = commentSlice.actions

export const commentReducer = commentSlice.reducer
