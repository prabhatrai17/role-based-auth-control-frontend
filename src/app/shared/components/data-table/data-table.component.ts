import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input() rows!: any[];
  @Input() columns!: any[];
  @Input() loading = false;
  @Input() pData!: any[];
  @Input() uniqueId = ''
  @Input() rowSelectEnable = false;
  selectedRow: any
  @Output() buttonClickEmitter = new EventEmitter<any>();
  ngOnInit() {

  }
  buttonClick(rowData: any, action: String) {
    const eventData = { action: action, rowData };
    this.buttonClickEmitter.emit(eventData);
  }
  rowSelect(event: any) {
    if (this.rowSelectEnable) {
      const eventData = { action: 'view', rowData: event.data };
      this.buttonClickEmitter.emit(eventData);
    }

  }
  getProfileId(rowData: any) {
    return rowData?.profile?.profileId;
  }
}
