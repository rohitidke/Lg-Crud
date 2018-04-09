import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AlertController } from "ionic-angular";
import { TableData } from "./package.model";
import { PackageService } from "./package.service";

@Component({
  selector: "package",
  templateUrl: "package.html",
})
export class PackageComponent {

  public uid: any = 0;
  public j: any;
  public elements: any;
  public headerFromService: any;
  public resultFromService: any;
  public row: any = 0;
  public err: any;
  public isAllSelected: any;
  public checkAll: any = false;

  constructor(public serviceData: PackageService, public tData: TableData, public alertCtrl: AlertController) {
    this.headerFromService = serviceData.getHeaders();
    this.resultFromService = serviceData.getResult();
    this.elements = Object.keys(this.resultFromService[this.uid]);
    this.isAllSelected = this.tData.isAllSelected;
    this.checkAll = this.tData.checkAll;
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
    this.serviceData.checkedRow(event, id);
    this.row = this.tData.row;
    this.checkAll = this.tData.checkAll;
    this.isAllSelected = this.tData.isAllSelected;
  }

  public removeSelect() {
    this.serviceData.removeSel();
    this.row = 0;
    this.err = this.tData.err;
    this.checkAll = this.tData.checkAll;
  }

  public selectAll(event) {
    this.serviceData.selectAll(event);
    this.isAllSelected = this.tData.isAllSelected;
    this.row = this.tData.selectedRow.length;
  }
}
