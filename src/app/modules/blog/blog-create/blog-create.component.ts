import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@app/shared/models/post';
import * as BlogActionTypes from "@app/store/blog/blog.actions";
import { BlogState } from '@app/store/blog/blog.reducers';
import * as BlogStoreSelectors from "@app/store/blog/blog.selectors";
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.scss']
})
export class BlogCreateComponent {
  public title!: string;
  public postForm!: FormGroup;
  public submitted: boolean = false;
  public isLoading$!: Observable<boolean>;
  private unsubscribe$ = new Subject();
  public error$!: Observable<string|null>;


  constructor(
    private readonly store$: Store<BlogState>,
    private route: ActivatedRoute,

  ) { }


  private initForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(70)]),
      body: new FormControl(null, [Validators.required, Validators.maxLength(300)])
    });
  }


  ngOnInit(): void {
    this.title = 'Create New Post';
    this.initForm();
  }


  private selectData(): void {

    this.error$ = this.store$.select(BlogStoreSelectors.getErrormessage);
    this.isLoading$ = this.store$.select(BlogStoreSelectors.getIsLoading);
  }



  onSubmitPost() {
    this.submitted = true;
    if (this.postForm.invalid)
     return;
    const post: Post = {
      id: 0,
      userId: 1,
      ...this.postForm.value
    };
    this.store$.dispatch(BlogActionTypes.createPostRequestAction({ item: post }));
    this.selectData();
  }


  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();

  }
}
