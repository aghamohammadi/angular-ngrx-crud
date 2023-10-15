import { createReducer, on } from "@ngrx/store";
import * as ActionTypes from "./blog.actions";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";
import { Post } from "@app/shared/models/post";


export const blogFeatureKey = 'blog-feature';


export interface BlogState extends EntityState<Post> {
  error: string | null;
  sortType: number;
  searchTerm: string;
  selectedId: number | null;
  pageNumber: number;
  pageSize: number;
  isLoading: boolean;
}
const adapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialBlogState: BlogState = adapter.getInitialState({
  isLoading: false,
  selectedId: null,
  error: null,
  pageNumber: 1,
  pageSize: 10,
  searchTerm: '',
  sortType: 0
});

export const blogReducer = createReducer(
  initialBlogState,
  on(ActionTypes.getAllPostsRequestAction, state => ({
    ...state,
    isLoading: true,
    error: null
  })),

  on(ActionTypes.getAllPostsSuccessAction, (state, { items }) => (
    adapter.setAll(items, { ...state, isLoading: false })
   )),
  on(ActionTypes.getAllPostsErrorAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  on(ActionTypes.createPostRequestAction, (state) => ({
    ...state,
    isLoading: true
  })),

  on(ActionTypes.createPostSuccessAction, (state, { item }) => (
    adapter.addOne(item, {
      ...state,
      isLoading: false
    })
)),

  on(ActionTypes.createPostErrorAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(ActionTypes.updatePostRequestAction, (state) => ({
    ...state,
    isLoading: true
  })),

  on(ActionTypes.updatePostSuccessAction, (state, { item }) => (
    adapter.updateOne({ id: item.id, changes: item }, {
      ...state,
      isLoading: false,
    })
    )),

  on(ActionTypes.updatePostErrorAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(ActionTypes.deletePostRequestAction, (state) => ({
    ...state,
    isLoading: true
  })),

  on(ActionTypes.deletePostSuccessAction, (state, { id }) => (
    adapter.removeOne(id, {
      ...state,
      isLoading: false,
    })
  )),
  on(ActionTypes.deletePostErrorAction, (state, { error }) => ({
    ...state,
    isLoading: false,
    error: error
  })),
  on(ActionTypes.getPostAction, (state, { id }) => (
    { ...state, selectedId: id }
  )),
  on(ActionTypes.searchPostAction, (state, { searchTerm }) => (
    { ...state, searchTerm }
  )),
  on(ActionTypes.sortPostAction, (state, { sortType }) => (
    { ...state, sortType }
  )),
  on(ActionTypes.setPaginationAction, (state, { pageNumber, pageSize }) => (
    { ...state, pageNumber,pageSize }
  )),
)


export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

