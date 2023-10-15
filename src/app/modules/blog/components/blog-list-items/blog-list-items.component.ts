import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '@app/shared/models/post';

@Component({
  selector: 'app-blog-list-items',
  templateUrl: './blog-list-items.component.html',
  styleUrls: ['./blog-list-items.component.scss']
})
export class BlogListItemsComponent {
  @Input() items!: Post[] | null;
  @Input() isLoading!: boolean | null;
  @Input() error!: string;
  @Output() onDelete = new EventEmitter<number>();

  onDeleteClick(id: number): void {
      this.onDelete.emit(id);
  }
}
