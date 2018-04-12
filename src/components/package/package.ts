import { Component, OnInit } from "@angular/core";
import { PackageModel } from "./package.model";

@Component({
  selector: "package",
  templateUrl: "package.html",
})
export class PackageComponent {

  constructor(public packageModel: PackageModel) {
    this.getData();
  }

  public getData() {
    this.packageModel.getHeaders();
    this.packageModel.getResults();
  }

}
