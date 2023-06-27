import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastr: ToastrService) { }

  showError(message: string | undefined, title?: string | undefined){
    this.toastr.error(message,title, {
      positionClass: 'toast-bottom-right'
    })
  }

  showSuccess(message: string | undefined, title?: string | undefined){
    this.toastr.success(message,title, {
      positionClass: 'toast-bottom-right'
    })
  }
}
