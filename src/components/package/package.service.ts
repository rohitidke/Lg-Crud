import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";

@Injectable()
export class PackageService {
  public showPages = 5;
  public middlePage = 3;
  public startPage = 1;
  public lastPages = 4;
  public count = 1;
  public sidePages = 2;
  public pageSize = 10;
  constructor(public http: Http) { }

  public getResults(): Observable<any> {
    return this.http.get("assets/result.json")
      .map((res: Response) => res.json().results);
  }

  public getHeaders(): Observable<any> {
    return this.http.get("assets/result.json")
      .map((res: Response) => res.json().headers);
  }
}
