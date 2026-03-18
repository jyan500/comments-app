import React, {useState, useEffect} from "react"
import { Container } from "../components/page-elements/Container"
import { CommentForm } from "../components/comments/CommentForm"
import { CommentContainer } from "../components/comments/CommentContainer"
import { Button } from "../components/page-elements/Button"
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { 
	useLazyGetCommentsQuery,
} 
from "../services/public/comment"
import { useSearchParams } from "react-router-dom"
import type { Comment } from "../types/common"

interface FormValues {
	searchBy: string
	query: string
	sortBy: string
	order: string
	page: number
	perPage: number
}

export const CommentPage = () => {
	const [ searchParams, setSearchParams ] = useSearchParams()
	const [idMap, setIdMap] = useState<Record<string, Comment>>({})
	const [hierarchy, setHierarchy] = useState<Record<string, any>>({})
	const [form, setForm] = useState<FormValues>({
		searchBy: searchParams.get("searchBy") ? searchParams.get("searchBy") : "keyword",
		query: searchParams.get("query") ? searchParams.get("query") : "",
		sortBy: searchParams.get("sortBy")  ? searchParams.get("sortBy") : "id",
		order: searchParams.get("order") ? searchParams.get("order") : "asc",
		page: searchParams.get("page") && !isNaN(Number(searchParams.get("page"))) ? Number(searchParams.get("page")) : 1,
		perPage: 100,
	})
	const [trigger, {data, isLoading}] = useLazyGetCommentsQuery()

	useEffect(() => {
		// make initial response on page load
		onSubmit(1)	
	}, [])
	
	useEffect(() => {
		if (data?.data && !isLoading){
			setIdMap(getIdMap(data.data))
			const parentToChild = mapParentToChild(data.data)
			let threadComments = {}
			Object.keys(parentToChild).forEach((parentId) => {
				// start running recursion from each top level comment that has child comments
				if (parentToChild[parentId].length){
					threadComments[parentId] = buildIndex(parentToChild, parentId)
				}
				else {
					threadComments[parentId] = {}
				}
			})
			setHierarchy(threadComments)
		}
	}, [data, isLoading])		

	const onSubmit = (curPage) => {
		const { searchBy, query, sortBy, order } = form
		trigger({...form, page: curPage}, true)
		setSearchParams({
			searchBy, query, sortBy, order, page: curPage  
		})
	}

	const getTopLevelComments = (comments: Array<Comment>) => {
		return comments && comments.length ? 
			comments.filter((comment) => comment.parent === "") 
		: []
	}

	const buildIndex = (parentToChild: Record<string, Array<string>>, id: string) => {
		let index = {}
		if (id in parentToChild){
			parentToChild[id].forEach((commentId) => {
				index[commentId] = buildIndex(parentToChild, commentId)
			})
		}
		return index
	}

	const getIdMap = (comments: Array<Comment>) => {
		const idMap = comments.reduce((acc, obj) => {
			acc[obj.id] = obj
			return acc
		}, {})
		return idMap
	}

	/* 
		To prevent the need to search through the whole array each time to find the children 
		for each parent, we do a single O(N) scan. And then during recursion, instead of trying to find
		the children for the given id by scanning through the array again, 
		we just look up the id in this map, and know all the children for this particular parent.
	*/
	const mapParentToChild = (comments: Array<Comment>) => {
		let parentToChild = {}	
		comments.forEach((comment) => {
			if (comment.parent === ""){
				parentToChild[comment.id] = []
			}
			else {
				if (comment.parent in parentToChild){
					parentToChild[comment.parent].push(comment.id)
				}
				else {
					parentToChild[comment.parent] = [comment.id]
				}
			}
		})
		return parentToChild
	}

	const showHierarchy = (tree: Record<string, any>, level: number) => {
		return (
			<div className = "flex flex-col gap-y-4">
				{Object.keys(tree).map((key) => {
					const comment = idMap[key]
					if (Object.values(tree[key]).length === 0){
						return (
							<div key={comment.id}>
								<CommentContainer comment={comment}/>
							</div>
						)
					}
					else {
						return (
							<div key={comment.id} className = "border-l border-gray-200 flex flex-col gap-y-2">
								<CommentContainer key = {comment.id} comment={comment}/>
								<div style={{
									"paddingLeft": `40px`
								}}>
									{showHierarchy(tree[key], level+1)}
								</div>
							</div>
						)
					}
				})}
			</div>
		)
	}

	return (
		<Container>
			<h1 className = "font-bold text-xl">Comments</h1>	
			<form onSubmit={(e) => {
				e.preventDefault()
				setForm((prev) => ({
					...prev,
					page: 1
				}))
				onSubmit(1)
			}} className = "flex flex-row items-center gap-x-2">
					<select className = "border border-gray-400" onChange={(e) => {
						e.preventDefault()
						setForm({
							...form,
							sortBy: e.target.value,
						})
					}} value={form.sortBy}>
						<option value="id">Id</option>
						<option value="created_at">Created At</option>
					</select>	
					<button onClick={(e) => {
						e.preventDefault()
						setForm({
							...form,
							order: form.order === "asc" ? "desc" : "asc",
						})
					}}>{form.order === "asc" ? <ChevronUp/> : <ChevronDown/>}</button>
					<select className = "border border-gray-400" onChange={(e) => {
						e.preventDefault()
						setForm({
							...form,
							searchBy: e.target.value
						})
					}}>
						<option value = "keyword">Keyword</option>
						<option value = "author">Author</option>
					</select>
					<input onChange={(e) => {
						e.preventDefault()
						setForm({
							...form,
							query: e.target.value
						})
					}} className = "px-2 border border-gray-400" type="text" placeholder="search..."/>
					<Button type = "submit">Submit</Button>
			</form>
			{
				data?.pagination && (data.pagination.prevPage || data.pagination.nextPage) ?  
				<div className = "flex flex-row items-center gap-x-2">
					<button className={!data.pagination.prevPage ? "opacity-30" : ""} disabled={!data.pagination.prevPage} onClick={() => {
						const prevPage = form.page - 1
						setForm((prev) => (
							{
								...prev,
								page: prevPage
							}
						))	
						onSubmit(prevPage)
					}}><ChevronLeft/></button>
					<p>Page {form.page}</p>
					<button className={!data.pagination.nextPage ? "opacity-30" : ""} disabled={!data.pagination.nextPage} onClick={() => {
						const nextPage = form.page + 1
						setForm((prev) => (
							{
								...prev,
								page: nextPage
							}
						))
						onSubmit(nextPage)
					}}><ChevronRight/></button>
				</div>
				: null
			}
			<Container className = "w-full lg:w-1/2" theme = "bordered">
				<CommentForm/>
			</Container>
			{
				showHierarchy(hierarchy, 1)
			}
		</Container>
	)
}