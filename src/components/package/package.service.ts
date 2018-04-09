import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TableData } from "./package.model";

import * as _ from "underscore";

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

    public getPager(totalItems: number, currentPage: number = 1, pageSize: number = 10) {
        // calculate total pages
        const totalPages = Math.ceil(totalItems / pageSize);

        let startPage: number;
        let endPage: number;
        if (totalPages <= 5) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 3) {
                startPage = 1;
                endPage = 5;
            } else if (currentPage + 1 >= totalPages) {
                startPage = totalPages - 4;
                endPage = totalPages;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }

        // calculate start and end item indexes
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        const pages = _.range(startPage, endPage + 1);

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
