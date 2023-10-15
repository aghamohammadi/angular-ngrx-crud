import { Component } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import * as BlogActionTypes from "@app/store/blog/blog.actions";
import * as BlogStoreSelectors from "@app/store/blog/blog.selectors";
import { Post } from '@app/shared/models/post';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { BlogState } from '@app/store/blog/blog.reducers';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent {
  public isLoading$!: Observable<boolean>;
  private unsubscribe$ = new Subject();
  public error$!: Observable<string|null>;
  public post$!: Observable<Post | null>;


  constructor(
    private readonly store$: Store<BlogState>,
    private route: ActivatedRoute,

  ) { }





  ngOnInit(): void {
    this.selectData();
    this.route.params
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((params) => {
        const id = this.route.snapshot.paramMap.get('id');
        if (id)
          this.init(+id);
      });
  }

  private init(id: number): void {
    this.store$.dispatch(BlogActionTypes.getPostAction({ id }));

  }

  private selectData(): void {
    this.post$ = this.store$.select(BlogStoreSelectors.getCurrentPost);
    this.error$ = this.store$.select(BlogStoreSelectors.getErrormessage);
    this.isLoading$ = this.store$.select(BlogStoreSelectors.getIsLoading);
  }






  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
