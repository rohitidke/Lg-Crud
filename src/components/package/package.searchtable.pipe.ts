import { Injectable, Pipe, PipeTransform } from "@angular/core";
import { PackageComponent } from "../package/package";
import { PackageModel } from "../package/package.model";
@Injectable()
@Pipe({ name: "search" })
export class SearchtablePipe implements PipeTransform {
    public packageModel: PackageModel;
    public packageComponent: PackageComponent;
    public transform(items: any, searchText: any): any {
        if (searchText == null) {
            return items;
        }
        searchText = searchText.toLowerCase();
        return items.filter((search) => {
            return search.name.toLowerCase().includes(searchText);
        });
    }
}
