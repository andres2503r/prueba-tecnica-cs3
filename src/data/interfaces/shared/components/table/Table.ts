import { TableOptions } from '@tanstack/react-table'

export interface ITable<T> extends Omit<TableOptions<T>, 'getCoreRowModel'> {
  NotDataComponent?: () => JSX.Element;
  enableTableFooter?: boolean
  tableHeight?: number | string
  tableWidth?: number | string
  enableTableFilter?: boolean
  scrollAction?: () => void;
  onRowSelection?: (rows: Array<T>) => void
  enableTablePagination?: boolean
  clearState?: boolean;
  TableAction?: () => JSX.Element
  actionClear?: (confirmation: boolean) => void;
}
