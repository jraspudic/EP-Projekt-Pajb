import { Pipe, PipeTransform } from '@angular/core';
import { cloneDeep } from 'lodash';

@Pipe({ name: 'taskListFilter' })
export class TaskListFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    console.log('pipapipa');
    var resultArray: any[] = cloneDeep(items);

    if (searchText?.length > 0) {
      searchText = searchText.toLowerCase();
      resultArray.forEach((item) => {
        console.log('item:');
        console.log(item);
        item.tasks = item.tasks.filter((task) => {
          if (task.name && task.name.toLowerCase().includes(searchText)) {
            console.log('sadrzši');
            return true;
          }
        });
      });
    }
    console.log(resultArray);
    return resultArray;
  }
}
