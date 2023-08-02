import { MatPaginator } from "@angular/material/paginator";

export interface PageResponse<T> {
  content: T;
  pageable: any;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
  paginator: MatPaginator
}