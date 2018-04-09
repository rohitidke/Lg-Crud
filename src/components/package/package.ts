import { Component, OnInit } from "@angular/core";
import { AlertController } from "ionic-angular";
import { PackageService } from "./package.service";

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

  constructor(private serviceData: PackageService, private alertCtrl: AlertController) {
    this.headerFromService = serviceData.getHeaders();
    this.resultFromService = serviceData.getResult();
    this.elements = Object.keys(this.resultFromService[this.uid]);
    this.setPage(1);
  }

  public setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.serviceData.getPager(this.resultFromService.length, page);
    // get current page of items
    this.pagedItems = this.resultFromService.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
