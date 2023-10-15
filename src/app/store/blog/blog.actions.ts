import { Post } from "@app/shared/models/post";
import { createAction, props } from "@ngrx/store";

enum ActionTypes {
  GET_POSTS = '[ALL] Posts',
  GET_POSTS_SUCCESS = '[ALL] Posts Success',
  GET_POSTS_ERROR = '[ALL] Posts Error',

  CREATE_POST = '[CREATE] Post',
  CREATE_POST_SUCCESS = '[CREATE] Post Success',
  CREATE_POST_ERROR = '[CREATE] Post Error',

  DELETE_POST = '[DELETE] Post',
  DELETE_POST_SUCCESS = '[DELETE] Post Success',
  DELETE_POST_ERROR = '[DELETE] Post Error',

  UPDATE_POST = '[UPDATE] Post',
  UPDATE_POST_SUCCESS = '[UPDATE] Post Success',
  UPDATE_POST_ERROR = '[UPDATE] Post Error',

  GET_POST = '[GET] Post',
  SEARCH_POST = '[SEARCH] Post',
  SORT_POST = '[SORT] Post',
  PAGINATION_POST = '[PAGINATION] Post',
}




export const getAllPostsRequestAction = createAction(
  ActionTypes.GET_POSTS
);
export const getAllPostsSuccessAction = createAction(
  ActionTypes.GET_POSTS_SUCCESS,
  props<{ items: Post[] }>()
);
export const getAllPostsErrorAction = createAction(
  ActionTypes.GET_POSTS_ERROR,
  props<{ error: string }>()
);



export const createPostRequestAction = createAction(
  ActionTypes.CREATE_POST,
  props<{ item: Post }>()
);
export const createPostSuccessAction = createAction(
  ActionTypes.CREATE_POST_SUCCESS,
  props<{ item: Post  }>()
);
export const createPostErrorAction = createAction(
  ActionTypes.CREATE_POST_ERROR,
  props<{ error: string }>()
);



export const updatePostRequestAction = createAction(
  ActionTypes.UPDATE_POST,
  props<{ item: Post }>()
);
export const updatePostSuccessAction = createAction(
  ActionTypes.UPDATE_POST_SUCCESS,
  props<{ item: Post  }>()
);
export const updatePostErrorAction = createAction(
  ActionTypes.UPDATE_POST_ERROR,
  props<{ error: string }>()
);


export const deletePostRequestAction = createAction(
  ActionTypes.DELETE_POST,
  props<{ id: number }>()
);
export const deletePostSuccessAction = createAction(
  ActionTypes.DELETE_POST_SUCCESS,
  props<{ id: number }>()
);
export const deletePostErrorAction = createAction(
  ActionTypes.DELETE_POST_ERROR,
  props<{ error: string }>()
);


export const getPostAction = createAction(
  ActionTypes.GET_POST,
  props<{ id: number }>()
);
export const searchPostAction = createAction(
  ActionTypes.SEARCH_POST,
  props<{ searchTerm: string }>()
);
export const sortPostAction = createAction(
  ActionTypes.SORT_POST,
  props<{ sortType: number }>()
);
export const setPaginationAction = createAction(
  ActionTypes.PAGINATION_POST,
  props<{ pageNumber: number,pageSize:number }>()
);
