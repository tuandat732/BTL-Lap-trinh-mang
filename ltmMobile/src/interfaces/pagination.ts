
export interface IPagination {
  total: number;
  perPage: number;
  lastPage: number;
  page: number;
}

export interface IDatatablePagination<T> {
  pagination: IPagination;
  data: T[];
}
