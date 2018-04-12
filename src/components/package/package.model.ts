import { Injectable } from "@angular/core";
import * as _ from "lodash";
import { PackageService } from "./package.service";

@Injectable()
export class PackageModel {
  public headers: any;
  public results: any;
  public pager: any = {};
  public pagedItems: any[];
  public uid: any = 0;
  public elements: any;

  constructor(private serviceData: PackageService) { }

  public getHeaders() {
    this.serviceData.getHeaders().subscribe((data) => {
      this.headers = data;
    });
  }

  public getResults() {
    this.serviceData.getResults().subscribe((data) => {
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
    this.pager = this.getPager(this.results.length, page);
    // get current page of items
    this.pagedItems = this.results.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  public getPager(
    totalItems: number,
    currentPage: number = this.serviceData.startPage,
    pageSize: number = this.serviceData.pageSize,
  ) {
    // calculate total pages
    const totalPages = Math.ceil(totalItems / pageSize);

    let startPage: number;
    let endPage: number;
    if (totalPages <= this.serviceData.showPages) {
      startPage = this.serviceData.startPage;
      endPage = totalPages;
    } else if (currentPage <= this.serviceData.middlePage) {
      startPage = this.serviceData.startPage;
      endPage = this.serviceData.showPages;
    } else if (currentPage + this.serviceData.count >= totalPages) {
      startPage = totalPages - this.serviceData.lastPages;
      endPage = totalPages;
    } else {
      startPage = currentPage - this.serviceData.sidePages;
      endPage = currentPage + this.serviceData.sidePages;
    }

    // calculate start and end item indexes
    const startIndex = (currentPage - this.serviceData.count) * pageSize;
    // tslint:disable-next-line:max-line-length
    const endIndex = Math.min(startIndex + pageSize - this.serviceData.count, totalItems - this.serviceData.count);

    // create an array of pages
    const pages = _.range(startPage, endPage + this.serviceData.count);

    return {
      currentPage,
      endIndex,
      endPage,
      pageSize,
      pages,
      startIndex,
      startPage,
      totalItems,
      totalPages,
    };
  }

}
