import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-spin-button',
  templateUrl: './spin-button.component.html',
  styleUrls: ['./spin-button.component.css']
})
export class SpinButtonComponent {
  @Input() buttonLabel = '';
  @Input() isSpinnerActive = false;
  @Input() enableButton = false;
  @Output() buttonEmitter = new EventEmitter<String>();
  buttonClickEvent() {
   this.buttonEmitter.emit('submit');
  }
}
