import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListItemsComponent } from './blog-list-items.component';

describe('BlogListItemsComponent', () => {
  let component: BlogListItemsComponent;
  let fixture: ComponentFixture<BlogListItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlogListItemsComponent]
    });
    fixture = TestBed.createComponent(BlogListItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
