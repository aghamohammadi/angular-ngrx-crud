import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@app/shared/models/post';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import * as BlogActionTypes from "@app/store/blog/blog.actions";
import * as BlogStoreSelectors from "@app/store/blog/blog.selectors";
import { BlogState } from '@app/store/blog/blog.reducers';


@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit, OnDestroy {
  public title!:string;
  public postForm!: FormGroup;
  public submitted: boolean=false;
  public isLoading$!: Observable<boolean>;
  private unsubscribe$ = new Subject();
  public error$!: Observable<string|null>;
  public post!: Post;


  constructor(
    private readonly store$: Store<BlogState>,
    private route: ActivatedRoute,

  ) { }


  private initForm() {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(70)]),
      body: new FormControl('', [Validators.required, Validators.maxLength(300)])
    });
  }


  ngOnInit(): void {
    this.title ='Edit Post';
    this.initForm();
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
     this.store$.select(BlogStoreSelectors.getCurrentPost).subscribe(post => {
      if (post) {
        this.post = post;
        this.postForm.patchValue({
          title: post.title,
          body: post.body,
        });
      }
    });
    this.error$ = this.store$.select(BlogStoreSelectors.getErrormessage);
    this.isLoading$ = this.store$.select(BlogStoreSelectors.getIsLoading);
  }



  onSubmitPost() {
    this.submitted=true;
    if (this.postForm.invalid)
      return;

    const post:Post = {
      id: this.post.id,
      userId: 1,
      ...this.postForm.value
    };
    this.store$.dispatch(BlogActionTypes.updatePostRequestAction({ item:post }));

  }


  ngOnDestroy() {
    this.unsubscribe$.next(void 0);
    this.unsubscribe$.complete();
  }
}
