import { Component, Input } from '@angular/core';
import { LoaderService } from '../../services/loader-service/loader.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent {
  @Input() show: boolean = false;
  @Input() largeSpinner = false;
  constructor(private loaderService: LoaderService) {
    this.loaderService.getLoader().subscribe(res => {
      this.show  = res;
    });
  }

}
