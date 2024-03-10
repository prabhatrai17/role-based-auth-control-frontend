import { Component, Input } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  constructor(public config: DynamicDialogConfig, private ref: DynamicDialogRef) {
    console.log(config.data)
  }
  actionClick(action: String) {
    this.ref.close(action);
  }
  cancelMethod() {
    this.ref.close();
  }
}
