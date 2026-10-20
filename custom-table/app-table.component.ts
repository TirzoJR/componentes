import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChildren,
  effect,
  input,
  output,
  QueryList,
  signal,
  ViewChild,
} from '@angular/core';
import { OPaginatorComponent } from './components/paginator/o-paginator.component';
import { ColumnTemplateDirective } from './directive/column-template.directive';
import { IColumnMatch, IPageData, ISortOptions } from './interfaces/table-data.interface';

@Component({
  selector: 'o-table, app-o-table',
  standalone: true,
  imports: [NgTemplateOutlet, CommonModule, OPaginatorComponent],
  templateUrl: './app-table.component.html',
  styleUrl: './app-table.component.scss',
})
export class OTableComponent implements AfterContentInit {
  @ContentChildren(ColumnTemplateDirective) templates!: QueryList<ColumnTemplateDirective>;
  @ViewChild(OPaginatorComponent) paginator!: OPaginatorComponent;

  data = input.required<any[]>();
  columns = input.required<IColumnMatch[]>();

  isLocalMode = input<boolean>(false);
  itemsPerPageOptions = input.required<number[]>();
  totalItems = input.required<number>();

  OnPage = output<IPageData>();
  pageChange = output<IPageData>();

  itemsPerPage = signal<number>(10);
  currentPage = signal<number>(1);
  currentPageInput = input<number>(1);
  sortState = signal<ISortOptions>({ active: false, colToSort: null, order: 'asc' });

  typeOrderSort = {
    asc: '&#9650;',
    desc: '&#9660;',
  };

  constructor() {
    effect(
      () => {
        const externalPage = this.currentPageInput();
        if (externalPage) {
          this.currentPage.set(externalPage);
        }
      },
      { allowSignalWrites: true }
    );

    effect(
      () => {
        const options = this.itemsPerPageOptions();
        if (options && options.length > 0) {
          this.itemsPerPage.set(options[2] ?? 10);
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngAfterContentInit(): void {
    this.templates.toArray().forEach((template) => {
      this.columns().find((header) => header.key === template.key)!.template = template.template;
    });
  }

  get sortedData(): any[] {
    if (!this.sortState().active) return this.data();

    const { colToSort, order } = this.sortState();
    const dir = order === 'asc' ? 1 : -1;

    return [...this.data()].sort((a, b) => {
      let valA = a[colToSort!];
      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
      }
      let valB = b[colToSort!];
      if (typeof valB === 'string') {
        valB = valB.toLowerCase();
      }
      const isLess = valA < valB ? -1 : 0;
      return (valA > valB ? 1 : isLess) * dir;
    });
  }

  get paginatedData(): any[] {
    if (!this.isLocalMode()) return this.data();
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    return this.sortedData.slice(start, start + this.itemsPerPage());
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
    if (this.isLocalMode()) return;
    const pageData = {
      page,
      itemsPerPage: this.itemsPerPage(),
      ...(this.sortState().active && {
        sortKey: this.sortState().colToSort!,
        sortDirection: this.sortState().order,
      }),
    };
    this.pageChange.emit(pageData);
    this.OnPage.emit(pageData);
  }

  onItemsPerPageChange(value: number) {
    const pageData = {
      page: 1,
      itemsPerPage: value,
      ...(this.sortState().active && {
        sortKey: this.sortState().colToSort!,
        sortDirection: this.sortState().order,
      }),
    };

    if (!this.isLocalMode()) {
      this.pageChange.emit(pageData);
      this.OnPage.emit(pageData);
    }

    this.currentPage.set(1);
    this.itemsPerPage.set(value);
  }

  onSort(col: IColumnMatch) {
    if (!col.sortable) return;

    const currentSort = this.sortState();
    const isSameCol = currentSort.colToSort === col.key;
    const newOrder = isSameCol && currentSort.order === 'asc' ? 'desc' : 'asc';

    this.sortState.set({
      active: true,
      colToSort: col.key,
      order: newOrder,
    });

    const pageData = {
      page: 1,
      itemsPerPage: this.itemsPerPage(),
      sortKey: col.key,
      sortDirection: newOrder,
    };

    this.pageChange.emit(pageData);
    this.OnPage.emit(pageData);
  }

  resetPage() {
    this.paginator.resetCurrentPage();
  }
}
