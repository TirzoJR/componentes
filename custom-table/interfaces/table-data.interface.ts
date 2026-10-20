import { TemplateRef } from "@angular/core"

export interface IColumnMatch {
  key: string,
  headerTitle?: string
  template?: TemplateRef<any>
  headerTemplate?: TemplateRef<any>;
  colStyle?: string
  cellClass?: string
  sortable?: ISortTable
  stickyOn?: boolean
}

export interface ISortTable {
  active: boolean
  order?: IOrderTable
}

export interface ISortOptions extends ISortTable {
  colToSort?: string | null
}

export interface IPageData {
  page: number
  itemsPerPage: number
  sortKey?: string
  sortDirection?: string
}

export type IOrderTable = 'asc' | 'desc'

export interface ITableFilter {
  key: string;
  value: any;
}
