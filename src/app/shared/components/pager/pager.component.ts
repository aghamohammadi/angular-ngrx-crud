import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Input() totalCount!: number;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() currentPage !: number;;
  @Input() pageCount !: number;


  public totalPages: number = 0;
  public pages: number[] = [];




  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed

      this.totalPages = Math.ceil(this.totalCount / this.pageCount);
      this.pages = this.getPages(this.currentPage, this.totalPages)

  }

  onChangePage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.changePage.emit(this.currentPage);
    }
  }

  private getPages(current: number, total: number): number[] {
    if (total <= 7) {
      return [...Array(total).keys()].map((x) => ++x);
    }

    if (current > 5) {
      if (current >= total - 4) {
        return [1, -1, total - 4, total - 3, total - 2, total - 1, total];
      } else {
        return [1, -1, current - 1, current, current + 1, -1, total];
      }
    }

    return [1, 2, 3, 4, 5, -1, total];
  }
}
