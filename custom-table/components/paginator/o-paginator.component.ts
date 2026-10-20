import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
    selector: 'o-paginator',
    imports: [CommonModule],
    templateUrl: './o-paginator.component.html',
    styleUrl: './o-paginator.component.scss'
})
export class OPaginatorComponent {
  totalItems = input.required<number>()
  itemsPerPage = input.required<number>()
  currentPage = input<number>(1)

  itemsPerPageOptions = input.required<number[]>();

  pageChange = output<number>()

  itemsPerPageChange = output<number>()


  getRangeStart(): number {
    return (this.currentPage() - 1) * this.itemsPerPage() + 1;
  }

  getRangeEnd(): number {
    return Math.min(this.currentPage() * this.itemsPerPage(), this.totalItems());
  }

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  onItemsPerPageChange(value: string) {
    this.itemsPerPageChange.emit(Number(value));
  }

  goToFirstPage() {
    this.pageChange.emit(1);
  }

  goToLastPage() {
    const lastPage = Math.ceil(this.totalItems() / this.itemsPerPage());
    this.pageChange.emit(lastPage);
  }

}
