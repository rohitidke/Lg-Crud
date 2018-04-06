import { Component, OnInit } from "@angular/core";
import { AlertController } from "ionic-angular";
import { TableDataProvider } from "./package.service";

import * as _ from "underscore";

@Component({
  selector: "package",
  templateUrl: "package.html",
})
export class PackageComponent {

  public pager: any = {};
  public pagedItems: any[];

  public uid: any = 0;
  public elements: any;
  public headerFromService: any;
  public resultFromService: any;
  public rowSelected = [];
  public row = 0;

  constructor(private tableData: TableDataProvider, private alertCtrl: AlertController) {
    this.headerFromService = tableData.getHeaders();
    this.resultFromService = tableData.getResult();
    this.elements = Object.keys(this.resultFromService[this.uid]);
    this.setPage(1);
  }

  public onDelete() {
    let i;
    for (i = 0; i < this.rowSelected.length; i++) {
      const temp = this.resultFromService.find((x) => x.id === this.rowSelected[i]);
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

  public deleteConfirm() {
    if (this.row === 0) {
      const alert = this.alertCtrl.create({
        buttons: ["Dismiss"],
        message: "Please select atleast one row to delete.",
        title: "No row selected",
      });
      alert.present();
    } else {
      const alert = this.alertCtrl.create({
        buttons: [
          {
            role: "cancel",
            text: "Cancel",
          },
          {
            handler: () => {
              this.onDelete();
            },
            text: "Delete",
          },
        ],
        message: "Do you want to delete this row?",
        title: "Confirm Delete",
      });
      alert.present();
    }
  }

  public setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.tableData.getPager(this.resultFromService.length, page);

    // get current page of items
    this.pagedItems = this.resultFromService.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
