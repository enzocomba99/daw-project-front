import {MatPaginatorIntl} from '@angular/material/paginator';
import {Subject} from 'rxjs';
import {Injectable } from '@angular/core';

@Injectable()
export class PaginatorService implements MatPaginatorIntl {
  changes = new Subject<void>();
  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`First page`;
  itemsPerPageLabel = $localize`Cantidad por página:`;
  lastPageLabel = $localize`Last page`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Siguiente página';
  previousPageLabel = 'Anterior página';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Página 1 of 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Página ${page + 1} de ${amountPages}`;
  }

}
