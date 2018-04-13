import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: "search"})
export class SearchtablePipe implements PipeTransform {
  public transform(items: any, searchText: any): any {
      if (searchText == null) {
          return items ; }
      searchText = searchText.toLowerCase();
      return items.filter((search) => {
      return search.name.toLowerCase().includes(searchText);
    } );
  }
}
