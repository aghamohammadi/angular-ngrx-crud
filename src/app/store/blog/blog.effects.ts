import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, delay, map, of, switchMap, tap } from "rxjs";
import * as ActionTypes from "./blog.actions";
import { BlogService } from "@app/core/services/blog.service";
import { Post } from "@app/shared/models/post";
import { Router } from "@angular/router";

@Injectable()

export class BlogEffects {
  constructor(private readonly actions$: Actions,
    private router: Router,
     private readonly postService: BlogService) {
  }

  getPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.getAllPostsRequestAction),
      switchMap(action => {
        return this.postService.getPosts().pipe(
          map((items: Post[]) => {
            return ActionTypes.getAllPostsSuccessAction({ items: items})
          }),
          catchError((error: any) => {
            return of(ActionTypes.getAllPostsErrorAction({ error: error.message }))
          })
        )
      })
    )
  );

  createPost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.createPostRequestAction),
      switchMap(action => {
        return this.postService.create(action.item).pipe(
          map((item: Post) => {
            return ActionTypes.createPostSuccessAction({ item })
          }),

          catchError((error: any) => {
            return of(ActionTypes.createPostErrorAction({ error: error.message }))
          })
        )
      })
    )
  );
  createPostSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ActionTypes.createPostSuccessAction),
      tap(async () => {
        this.router.navigate(['/blog'])
      }
      )
    );
  }, { dispatch: false });



  updatePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.updatePostRequestAction),
      switchMap(action => {
        return this.postService.update(action.item).pipe(
          map((item: Post) => {
            return ActionTypes.updatePostSuccessAction({ item })
          }),
          catchError((error: any) => {
            return of(ActionTypes.updatePostErrorAction({ error: error.message }))
          })
        )
      })
    )
  );

  deletePost$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ActionTypes.deletePostRequestAction),
      switchMap(action => {
        return this.postService.delete(action.id).pipe(
          map(() => {
            return ActionTypes.deletePostSuccessAction({ id :+action.id })
          }),
          catchError((error: any) => {
            return of(ActionTypes.deletePostErrorAction({ error: error.message }))
          })
        )
      })
    )
  );
}
