import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TableData } from "./package.model";

import * as _ from "lodash";

@Injectable()
export class PackageService {
    public headers: any;
    public result: any;
    public model: any;
    constructor(public http: HttpClient) {
        this.model = new TableData();
    }

    public getHeaders() {
        this.headers = this.model.headers;
        return this.headers;
    }

    public getResult() {
        this.result = this.model.result;
        return this.result;
    }

    public getPager(
        totalItems: number,
        currentPage: number = this.model.startPage,
        pageSize: number = this.model.pageSize,
    ) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number;
        let endPage: number;
        if (totalPages <= this.model.displayPages) {
            startPage = this.model.startPage;
            endPage = totalPages;
        } else {
            if (currentPage <= this.model.middlePage) {
                startPage = this.model.startPage;
                endPage = this.model.displayPages;
            } else if (currentPage + this.model.oneIndex >= totalPages) {
                startPage = totalPages - this.model.lastPages;
                endPage = totalPages;
            } else {
                startPage = currentPage - this.model.sidePages;
                endPage = currentPage + this.model.sidePages;
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - this.model.oneIndex) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - this.model.oneIndex, totalItems - this.model.oneIndex);

        // create an array of pages to ng-repeat in the pager control
        const pages = _.range(startPage, endPage + this.model.oneIndex);

        // return object with all pager properties required by the view
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
