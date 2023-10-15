import { Component, OnInit } from '@angular/core';
import { Post } from '@app/shared/models/post';
import { Store } from '@ngrx/store';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import * as BlogActionTypes from "@app/store/blog/blog.actions";
import * as BlogStoreSelectors from "@app/store/blog/blog.selectors";
import { ActivatedRoute, Router } from '@angular/router';
import { BlogState } from '@app/store/blog/blog.reducers';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.scss']
})
export class BlogListComponent implements OnInit {

  public pageNumber = 1;
  public pageSize = 10;
  public orderType = 0;
  public searchTerm = '';

  public title!:string;
  public totalCount$!:  Observable<number>;
  public posts$!: Observable<Post[]>;
  public isLoading$!: Observable<boolean>;
  public error$!: Observable<string|null>;

  constructor(
    private readonly store$: Store<BlogState>,
    private router: Router,
    private route: ActivatedRoute
    ) {
  }

  ngOnInit(): void {
    this.title ='Blog List';
    this.init();


  }

  private init(): void {
    this.posts$ = this.store$.select(BlogStoreSelectors.getFilteredPosts);
    this.error$ = this.store$.select(BlogStoreSelectors.getErrormessage);
    this.isLoading$ = this.store$.select(BlogStoreSelectors.getIsLoading);
    this.totalCount$ = this.store$.select(BlogStoreSelectors.gettotalCount);
    this.store$.dispatch(BlogActionTypes.getAllPostsRequestAction());

  }



  onChangePage(page: number) {
    this.pageNumber = page;
    this.store$.dispatch(BlogActionTypes.setPaginationAction({ pageNumber: this.pageNumber, pageSize: this.pageSize }));
  }
  onChangeOrder(value: any) {
    this.onChangePage(1);
    this.orderType = +value.target.value;
    this.store$.dispatch(BlogActionTypes.sortPostAction({ sortType: this.orderType }));

  }
  onChangeSearch(value: any) {
    this.onChangePage(1);
    this.searchTerm = value.target.value?.trim();
    this.store$.dispatch(BlogActionTypes.searchPostAction({ searchTerm: this.searchTerm }));
  }

  onDelete(id: number) {
    this.store$.dispatch(BlogActionTypes.deletePostRequestAction({ id }));
  }

}
