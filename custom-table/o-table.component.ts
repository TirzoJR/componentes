import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Component, ContentChildren, effect, input, output, QueryList, signal } from '@angular/core';
import { OPaginatorComponent } from "./components/paginator/o-paginator.component";
import { ColumnTemplateDirective } from './directive/column-template.directive';
import { IColumnMatch, IPageData, ISortOptions, ITableFilter } from './interfaces/table-data.interface';
import { ColumnHeaderTemplateDirective } from './directive/header-template.directive';

@Component({
    selector: 'o-table',
    imports: [NgTemplateOutlet, CommonModule, OPaginatorComponent],
    templateUrl: './o-table.component.html',
    styleUrl: './o-table.component.scss'
})
export class OTableComponent {
  @ContentChildren(ColumnTemplateDirective) templates!: QueryList<ColumnTemplateDirective>
  @ContentChildren(ColumnHeaderTemplateDirective) headerTemplates!: QueryList<ColumnHeaderTemplateDirective>;

  data = input.required<any[]>()
  columns = input.required<IColumnMatch[]>()

  isLocalMode = input<boolean>(false)
  itemsPerPageOptions = input.required<number[]>();
  totalItems = input.required<number>();
  filter = input<ITableFilter | null>(null);

  OnPage = output<IPageData>()

  itemsPerPage = signal<number>(10);
  currentPage = signal<number>(1);
  currentPageInput = input<number>(1);

  sortState = signal<ISortOptions>({ active: false, colToSort: null, order: 'asc' });
  typeOrderSort = {
    asc: '&#9650;',
    desc: '&#9660;'
  }

  constructor() {
    effect(() => {
      const externalPage = this.currentPageInput();
      if (externalPage) {
        this.currentPage.set(externalPage);
      }
    }, { allowSignalWrites: true });

    effect(() => {
      const options = this.itemsPerPageOptions();
      if (options && options.length > 0) {
        this.itemsPerPage.set(options[0] ?? 10);
      }
    }, { allowSignalWrites: true });
  }

  ngAfterContentInit(): void {
    this.templates.forEach(tpl => {
      const col = this.columns().find(c => c.key === tpl.key);
      if (col) col.template = tpl.template;
    });

    this.headerTemplates.forEach(tpl => {
      const col = this.columns().find(c => c.key === tpl.key);
      if (col) col.headerTemplate = tpl.template;
    });
  }

  get filteredData(): any[] {
    const filter = this.filter();

    if (!filter) {
      return this.data();
    }

     if (filter.value === 'ALL') {
      return this.data();
    }

    return this.data().filter(row => {
      return row[filter.key] === filter.value;
    });
  }

  get sortedData(): any[] {
    if (!this.sortState().active) {
      return this.filteredData;
    }

    const { colToSort, order } = this.sortState();
    const dir = order === 'asc' ? 1 : -1;

    return [...this.filteredData].sort((a, b) => {
      let valA = a[colToSort!];
      let valB = b[colToSort!];

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
      }

      if (typeof valB === 'string') {
        valB = valB.toLowerCase();
      }

      const isLess = valA < valB ? -1 : 0;

      return (valA > valB ? 1 : isLess) * dir;
    });
  }

  get isEmpty(): boolean {
    return !this.data() || this.data().length === 0;
  }

  get paginatedData(): any[] {
    if (!this.isLocalMode()) {
      return this.filteredData;
    }

    const start = (this.currentPage() - 1) * this.itemsPerPage();

    return this.sortedData.slice(
      start,
      start + this.itemsPerPage()
    );
  }

  onPageChange(page: number) {
    this.currentPage.set(page)
    if (this.isLocalMode()) return
    this.OnPage.emit({
      page,
      itemsPerPage: this.itemsPerPage(),
      ...this.sortState().active && { sortDirection: this.sortState().colToSort!, sortKey: this.sortState().order }
    })
  }

  onItemsPerPageChange(value: number) {
    if (!this.isLocalMode()) {
      this.OnPage.emit({
        page: 1,
        itemsPerPage: value,
        ...this.sortState().active && { sortDirection: this.sortState().colToSort!, sortKey: this.sortState().order }
      })
    }

    this.currentPage.set(1);
    this.itemsPerPage.set(value);
  }

  onSort(col: IColumnMatch, index: number) {
    this.sortState.set({ active: true, colToSort: col.key, order: col.sortable?.order ?? 'asc' });
    this.columns()[index].sortable!.order = this.sortState().order === 'asc' ? 'desc' : 'asc'

    if (this.isLocalMode()) {
      this.currentPage.set(1);
    }

    if (col.sortable?.active) {
      this.OnPage.emit({
        page: 1,
        itemsPerPage: this.itemsPerPage(),
        sortKey: col.key,
        sortDirection: col.sortable?.order,
      });
    }

  }

}
