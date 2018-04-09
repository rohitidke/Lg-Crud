import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TableData } from "./package.model";

@Injectable()
export class PackageService {
  public count: any;
  public model: any;
  public headers: any;
  public result: any;

  constructor(public http: HttpClient, public tData: TableData) {
    this.model = new TableData();

  }

  public getHeaders() {
    this.headers = this.model.headers;
    return this.headers;
  }

  public getResult() {
    this.result = this.tData.resultFromModel;
    return this.result;
  }

  public checkedRow(event, id) {
    this.tData.checkedRow(event, id);
  }

  public removeSel() {
    this.tData.removeSel();
  }

  public selectAll(event) {
    this.tData.selectAll(event);
  }

}
