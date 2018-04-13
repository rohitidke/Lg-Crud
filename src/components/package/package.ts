import { Component, OnInit } from "@angular/core";
import { AlertController } from "ionic-angular";
import { PackageModel } from "./package.model";
import { SearchtablePipe } from "./package.searchtable.pipe";

@Component({
  selector: "package",
  templateUrl: "package.html",
})
export class PackageComponent {
  public pager: any = {};
  public pagedItems: any[];
  public uid: any = 0;
  public elements: any;
  public headers: any;
  public results: any;
  public row: any = 0;
  public selectedRow = [];
  public i: any;
  public err: any;
  public y: any;

  constructor(private alertCtrl: AlertController, public packageModel: PackageModel) {
    this.getData();
  }

  public getData() {
    this.packageModel.getHeaders().subscribe((data) => {
      this.headers = data;
    });
    this.packageModel.getResults().subscribe((data) => {
      this.results = data;
      this.elements = Object.keys(this.results[this.uid]);
      this.setPage(1);
    });
  }

  public setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }
    // get pager object from service
    this.pager = this.packageModel.getPager(this.results.length, page);
    // get current page of items
    this.pagedItems = this.results.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public presentConfirm() {
    const alert = this.alertCtrl.create({
      buttons: [
        {
          role: "cancel",
          text: "Cancel",
        },
        {
          handler: () => {
            this.removeSelect();
          },
          text: "Confirm",
        },
      ],
      message: "Do you want to delete the selected rows?",
      title: "Confirm Delete",
    });
    alert.present();
  }

  public checkedRow(event, id) {
    if (event.target.checked) {
      this.selectedRow.push(id);
      this.row = this.selectedRow.length;
    } else {
      this.selectedRow.splice(this.selectedRow.indexOf(id), 1);
      this.row = this.selectedRow.length;
    }
  }

  public removeSelect() {
    for (this.i = 0; this.i < this.selectedRow.length; this.i++) {
      this.y = this.results.find((x) => x.id === this.selectedRow[this.i]);
      this.results.splice(this.results.indexOf(this.y), 1);

    }
    this.selectedRow = [];
    this.row = 0;
    if (this.results.length === 0) {
      this.err = "No Data Available";
    } else {
      this.err = "";
    }
    this.pager = this.packageModel.getPager(this.results.length, this.pager.page);
    this.pagedItems = this.results.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public checkAll(ev) {
    this.results.forEach((x) => x.state = ev.target.checked);
    if (ev.target.checked) {
      this.selectedRow = [];
      this.results.map((item) => {
        return {
          id: item.id,
        };
      }).forEach((item) => this.selectedRow.push(item));
      this.row = this.selectedRow.length;
    } else {
      this.selectedRow = [];
      this.row = this.selectedRow.length;
    }
  }

  public isAllChecked() {
    return this.results && this.results.every((_) => _.state);
  }

}
