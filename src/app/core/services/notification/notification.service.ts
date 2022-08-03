import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { from, map, Observable } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private confirmConfig: SweetAlertOptions = {
    icon: 'question',
    confirmButtonText: 'Confirmar',
    showCancelButton: true,
    cancelButtonText: 'Cancelar',
    showCloseButton: true,
    customClass: {
      cancelButton: 'Swal__cancelButton',
    },
  };

  constructor(private toastr: ToastrService) {}

  confirm(options: SweetAlertOptions): Observable<boolean> {
    return from(
      Swal.fire({
        ...this.confirmConfig,
        ...options,
      })
    ).pipe(map((res) => res?.isConfirmed));
  }

  success(message: string): void {
    this.toastr.success(message);
  }

  error(message: string): void {
    this.toastr.error(message);
  }

  info(message: string): void {
    this.toastr.info(message);
  }

  warning(message: string): void {
    this.toastr.warning(message);
  }
}
