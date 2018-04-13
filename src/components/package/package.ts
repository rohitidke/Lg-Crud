import { Component, OnInit } from "@angular/core";
import { PackageModel } from "./package.model";

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

  constructor(public packageModel: PackageModel) {
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
}
