import { Component, OnInit } from '@angular/core';
import { TableDataProvider } from './package.service';
import { AlertController } from 'ionic-angular';

import * as _ from 'underscore';

@Component({
  selector: 'package',
  templateUrl: 'package.html'
})
export class PackageComponent {

  pager: any = {};
  pagedItems: any[];

  uid: any = 0;
  elements: any;
  headerFromService: any;
  resultFromService: any;
  rowSelected = [];
  row = 0;

  constructor(private tableData: TableDataProvider, private alertCtrl: AlertController) {
    this.headerFromService = tableData.getHeaders();
    this.resultFromService = tableData.getResult();
    this.elements = Object.keys(this.resultFromService[this.uid]);
    this.setPage(1);
  }

  onDelete() {

    for (let i = 0; i < this.rowSelected.length; i++) {
      let temp = this.resultFromService.find(x => x.id == this.rowSelected[i]);
      this.resultFromService.splice(this.resultFromService.indexOf(temp), 1);
    }
    this.rowSelected = [];
    this.row = 0;
    this.setPage(this.pager.currentPage);
  }

  public selectedRow(event, id) {
    if (event.target.checked) {
      this.rowSelected.push(id);
    } else {
      this.rowSelected.splice(this.rowSelected.indexOf(id), 1);
    }
    this.row = this.rowSelected.length;
  }

  deleteConfirm() {
    if (this.row == 0) {
      let alert = this.alertCtrl.create({
        title: 'No row selected',
        message: 'Please select atleast one row to delete.',
        buttons: ['Dismiss']
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Confirm Delete',
        message: 'Do you want to delete this row?',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Delete',
            handler: () => {
              console.log('Delete clicked');
              this.onDelete();
            }
          }
        ]
      });
      alert.present();
    }
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
        return;
    }

    // get pager object from service
    this.pager = this.tableData.getPager(this.resultFromService.length, page);

    // get current page of items
    this.pagedItems = this.resultFromService.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
