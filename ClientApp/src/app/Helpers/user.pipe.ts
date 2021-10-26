import { Pipe, PipeTransform } from '@angular/core';
import { cloneDeep } from 'lodash';

@Pipe({ name: 'userFilter' })
export class UserFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    var resultArray: any[] = cloneDeep(items);

    if (searchText?.length > 0) {
      searchText = searchText.toLowerCase();
      resultArray = resultArray.filter((item) => {
        if (
          item.firstName?.toLowerCase().includes(searchText) ||
          item.lastName?.toLowerCase().includes(searchText) ||
          item.email?.toLowerCase().includes(searchText)
        ) {
          return true;
        }
      });
    }

    console.log(resultArray);
    return resultArray;
  }
}
