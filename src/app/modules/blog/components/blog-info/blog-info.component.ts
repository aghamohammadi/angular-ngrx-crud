import { Component, Input } from '@angular/core';
import { Post } from '@app/shared/models/post';

@Component({
  selector: 'app-blog-info',
  templateUrl: './blog-info.component.html',
  styleUrls: ['./blog-info.component.scss']
})
export class BlogInfoComponent {
  @Input() item!: Post|null;

}
