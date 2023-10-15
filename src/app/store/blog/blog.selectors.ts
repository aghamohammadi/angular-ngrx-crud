import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromBlog from "./blog.reducers";

const selectBlogState = createFeatureSelector<fromBlog.BlogState>(fromBlog.blogFeatureKey);

export const getAllPosts = createSelector(
  selectBlogState,
  fromBlog.selectAll
)



export const getIsLoading = createSelector(
  selectBlogState,
  state => state.isLoading
);

export const getErrormessage = createSelector(
  selectBlogState,
  state => state.error
);

export const getPostEntities = createSelector(
  selectBlogState,
  fromBlog.selectEntities
)


export const selectCurrentPostId = createSelector(
  selectBlogState,
  state => state.selectedId
)

export const getSearchTerm = createSelector(
  selectBlogState,
  (state) => state.searchTerm
);

export const getSortType = createSelector(
  selectBlogState,
  (state) => state.sortType
);
export const getPageNumber = createSelector(
  selectBlogState,
  (state) => state.pageNumber
);
export const getPageSize = createSelector(
  selectBlogState,
  (state) => state.pageSize
);

export const getCurrentPost = createSelector(
  getPostEntities,
  selectCurrentPostId,
  (postEntities, postId) => (postId?postEntities[postId]:null)??null
)

export const gettotalCount = createSelector(
  getAllPosts,
  getSearchTerm,
  (posts, searchTerm) => {
    let filteredPosts = posts;
    if (searchTerm) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return filteredPosts?.length;
  }
)

export const getFilteredPosts = createSelector(
  getAllPosts,
  getSearchTerm,
  getSortType,
  getPageNumber,
  getPageSize,
  (posts, searchTerm, sortType, pageNumber, pageSize) => {
    let filteredPosts = posts;
    const from = (pageNumber - 1) * pageSize;
    const to = pageNumber  * pageSize;

    if (searchTerm) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortType) {
      filteredPosts = filteredPosts.sort((a, b) => {
        if (sortType == 2) {
          return a.title.localeCompare(b.title);
        } else if (sortType == 3) {
          return b.title.localeCompare(a.title);
        }
        return a.id - b.id;
      });
    }

    return filteredPosts?.slice(from, to);
  }
);




