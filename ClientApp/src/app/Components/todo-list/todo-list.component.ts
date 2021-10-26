import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EmitType } from '@syncfusion/ej2-base';
import { MultiSelectComponent } from '@syncfusion/ej2-angular-dropdowns';

// import {
//   HtmlEditorService,
//   ImageService,
//   LinkService,
//   RichTextEditorComponent,
//   ToolbarService,
// } from "@syncfusion/ej2-angular-richtexteditor";

import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/Models/User.model';
import { UserService } from 'src/app/Services/user.service';
import { Todo } from 'src/app/Models/Todo.model';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(30px)' }),
        animate(200, style({ opacity: 1, transform: 'translateY(0px)' })),
      ]),

      transition(':leave', [
        animate(200, style({ opacity: 0, transform: 'translateY(30px)' })),
      ]),
    ]),
  ],

  // providers: [
  //   ToolbarService,
  //   HtmlEditorService,
  //   CheckBoxSelectionService,
  //   LinkService,
  //   ImageService,
  // ],
})
export class ToDoListComponent implements OnInit, OnDestroy {
  todoTitle: string;
  filter: string;
  anyRemainingModel: boolean;
  currentTodo: any;
  currentTodoName: string;
  public fields: Object = { text: 'name', value: 'id' };
  selectedMembers: number[] = [];
  public note: any = null;
  constructor(private userService: UserService) {}

  @Input() todos: Todo[];
  @Input() members: User[];
  @Input() type: string;

  public currentUser = this.userService.currentUserValue;
  @ViewChild('todoMenu') todoMenu: ElementRef;
  //eventTypes: IdNameColor[] = [];

  showAssignedToMe: boolean = false;
  showDeleted: boolean = false;

  @Input() todosChanged: boolean;

  ngOnInit() {}

  todoIdCounter = -1;

  addTodo(): void {
    if (this.todoTitle.trim().length === 0) {
      return;
    }

    this.todos.push(
      new Todo(this.todoTitle, this.todos.length, [], false, false, '')
    );
    // new ProjectTaskToDo(
    //   this.customIdForTodo--,
    //   this.todoTitle,
    //   "",
    //   false,
    //   this.todos.length,
    //   false,
    //   [],
    //   false,
    //   false,
    //   null,
    //   false,
    //   false,
    //   [],
    //   [],
    //   false,
    //   [],
    //   0,
    //   null,
    //   null,
    //   true
    // )
    console.log(this.todos);

    this.todoTitle = '';

    if (this.filter == 'completed') {
      this.filter = 'all';
    }
    this.anyRemainingModel = this.anyRemaining();
  }

  beforeEditCache: string;

  editTodo(todo: Todo): void {
    this.todos.forEach((item) => {
      item.editing = false;
    });
    this.beforeEditCache = todo.name;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.name.trim().length === 0) {
      todo.name = this.beforeEditCache;
    }

    this.anyRemainingModel = this.anyRemaining();
    setTimeout(() => {
      todo.editing = false;
    }, 200);
    this.todosChanged = true;
  }

  // cancelEdit(todo: ProjectTaskToDo): void {
  //   todo.name = this.beforeEditCache;
  //   todo.editing = false;
  //   this.cdr.detectChanges();
  // }

  deleteTodo(name: string): void {
    let index = this.todos.findIndex((item) => item.name == name);
    this.todos.splice(index, 1);
    this.currentTodoName = '';
    this.currentTodo = null;
    this.note = null;
  }

  remaining(): number {
    return this.todos.filter((todo) => {
      if (todo.title) {
        return false;
      } else {
        return !todo.checked;
      }
    }).length;
  }

  todoItemsLength() {
    let result: number = 0;

    if (!this.showAssignedToMe) {
      if (!this.showDeleted) {
        this.todos.forEach((todo) => {
          if (!todo.title) {
            result++;
          }
        });
      } else {
        this.todos.forEach((todo) => {
          if (!todo.title) {
            result++;
          }
        });
      }
    } else {
      if (!this.showDeleted) {
        this.todos.forEach((todo) => {
          if (!todo.title && todo.users.includes(this.currentUser._id as any)) {
            result++;
          }
        });
      } else {
        this.todos.forEach((todo) => {
          if (!todo.title && todo.users.includes(this.currentUser._id as any)) {
            result++;
          }
        });
      }
    }

    return result;
  }

  atLeastOneCompleted(): boolean {
    return (
      this.todos.filter((todo) => {
        return todo.checked && !todo.title;
      }).length > 0
    );
  }

  // clearCompleted(): void {
  //   this.todos = this.todos.filter(todo => !todo.completed);
  // }

  // checkAllTodos(): void {
  //   this.todos.forEach(todo => todo.done = (<HTMLInputElement>event.target).checked)
  //   this.anyRemainingModel = this.anyRemaining();
  // }

  anyRemaining(): boolean {
    return this.remaining() !== 0;
  }

  estimatedTimeSum: number = 0;
  todosFiltered(): any[] {
    var returnValue: any[] = [];

    returnValue = this.todos;

    // if (this.showAssignedToMe) {
    //   returnValue = returnValue.filter((todo) => {
    //     return (
    //       todo.teamMemberResponsible.includes(this.currentUser.id) ||
    //       todo.requestFeedback.includes(this.currentUser.id) ||
    //       todo.title
    //     );
    //   });
    // } else {
    //   returnValue = returnValue;
    // }
    if (this.filter === 'all') {
      return returnValue;
    } else if (this.filter === 'active') {
      return returnValue.filter((todo) => {
        return !todo.checked || todo.title;
      });
    } else if (this.filter === 'completed') {
      return returnValue.filter((todo) => {
        return todo.checked || todo.title;
      });
    }

    return returnValue;
  }

  todoDrop(event: CdkDragDrop<number[]>) {
    console.log('drop event');
    console.log(event);

    console.log(this.todos);

    let tempTodos: any[] = [];
    //make tempTodos array containing only the filtered data
    tempTodos = this.todosFiltered();

    //find id of item that was moved, and the id of the item next to which the item was moved
    let todoPrevName: string = tempTodos[event.previousIndex].name;
    let todoCurrentName: string = tempTodos[event.currentIndex].name;

    //find the index of the moved item in original array, and find the index of the item next to which the item was moved in the original array
    let previousIndex = this.todos.findIndex(
      (item) => item.name == todoPrevName
    );
    let currentIndex = this.todos.findIndex(
      (item) => item.name == todoCurrentName
    );
    moveItemInArray(this.todos, previousIndex, currentIndex);
  }

  todoMenuOpen(todo: Todo) {
    console.log(this.todos);
    this.skipClosing = true;
    this.currentTodo = todo;
    this.note = todo.note;
    this.todos.forEach((item) => {
      if (item.name == todo.name) {
        item.menuOpen = true;
      } else {
        item.menuOpen = false;
      }
    });
  }

  closeAllTodoMenus() {
    this.todos.forEach((item) => {
      item.menuOpen = false;
    });
    this.currentTodo = null;
    this.currentTodoName = '';
    this.note = null;
  }

  //skip closing sluzi zbog prvog klika na openTaskMenu. Bez skip closing ti ne da otvorit ga uopce

  private skipClosing: boolean = false;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.todoMenu && !this.skipClosing && !this.dialogIsOpened) {
      if (!this.todoMenu.nativeElement.contains(event.target)) {
        this.closeAllTodoMenus();
      }
    }
    this.skipClosing = false;
  }

  /****************** MEMBERS DIALOG ********************/

  // kad je otvoren dialog npr. note dialog, na click da ne zatvara menu od taska
  private dialogIsOpened: boolean = false;
  @ViewChild('membersDialog') membersDialog: any; //DialogComponent
  @ViewChild('multiSelectMembers') multiSelectMembers: MultiSelectComponent;

  public openMembersDialog(todo: any): void {
    this.dialogIsOpened = true;
    this.membersDialog.show();
  }

  membersDialogOpened() {
    this.multiSelectMembers.refresh();
  }
  public onOverlayClickMembers: EmitType<object> = () => {
    this.membersDialog.hide();
  };

  // closeMembersDialog() {
  //   this.todos.forEach((item) => {
  //     if (item.id == this.currentTodo.id) {
  //       item.teamMemberResponsible = cloneDeep(this.selectedMembers);
  //       item.modified = true;
  //     }
  //   });

  //   this.membersDialog.hide();
  //   this.dialogIsOpened = false;
  // }

  // quickOpenMembers(todo: any) {
  //   this.currentTodo = todo;
  //   this.currentTodoName = todo.name;
  //   this.selectedMembers = todo.teamMemberResponsible;
  //   console.log('todo menu open');
  //   this.todos.forEach((item) => {
  //     item.menuOpen = false;
  //   });
  //   this.dialogIsOpened = true;
  //   this.membersDialog.show();
  // }

  /************************************ NOTE DIALOG ****************************************/
  @ViewChild('noteDialog') noteDialog: any; //DialogComponent
  @ViewChild('todoRTE') noteRTE: any; //RichTextEditorComponent

  public noteAttachmentsExpanded: boolean = true;

  public openNoteDialog(todo: any): void {
    this.dialogIsOpened = true;

    this.note = todo.note;
    this.noteDialog.show();
  }
  public onOverlayClickNote: EmitType<object> = () => {
    this.noteDialog.hide();
  };

  closeNoteDialog() {
    this.todos.forEach((item) => {
      if (item.name == this.currentTodo.name) {
        item.note = this.note;
      }
    });

    this.noteDialog.hide();
    this.dialogIsOpened = false;
  }

  quickOpenNote(todo: any) {
    this.currentTodo = todo;
    this.note = todo.note;
    console.log('todo menu open');
    this.todos.forEach((item) => {
      item.menuOpen = false;
    });
    this.dialogIsOpened = true;

    this.noteDialog.show();
  }

  /*******************************************************************************************/

  /************************************ Mark as Title ****************************************/
  markAsTitle(todo: any) {
    todo.title = !todo.title;
    todo.menuOpen = false;
    this.todosChanged = true;
  }

  /*******************************************************************************************/

  /*******************************************************************************************/

  /************************* assigned to me **************/

  private eventsSubscription: Subscription;

  @Input() events: Observable<any>;

  changeFilter(filter: string) {
    this.filter = filter;
  }

  public tools = {
    type: 'Expand',
    items: ['Bold', 'Italic', 'Underline', '|', 'Undo', 'Redo'],
  };

  click() {
    console.log('detecting chagnes;');
  }

  ngOnDestroy() {}
}
