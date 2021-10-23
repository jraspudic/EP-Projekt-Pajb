import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EmitType } from '@syncfusion/ej2-base';
import {
  CheckBoxSelectionService,
  MultiSelectComponent,
} from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { cloneDeep } from 'lodash';

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

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
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
      new Todo(
        this.todoIdCounter--,
        this.todoTitle,
        this.todos.length,
        [],
        false,
        false,
        ''
      )
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

  // editTodo(todo: ProjectTaskToDo): void {
  //   this.todos.forEach((item) => {
  //     item.editing = false;
  //   });
  //   this.beforeEditCache = todo.name;
  //   todo.editing = true;

  //   this.cdr.detectChanges();
  // }

  // todoCrossedOut(todo: ProjectTaskToDo) {
  //   console.log("todo crossed");
  //   todo.modified = true;
  //   this.todosChanged = true;
  //   this.cdr.detectChanges();
  // }
  // doneEdit(todo: ProjectTaskToDo): void {
  //   if (todo.name.trim().length === 0) {
  //     todo.name = this.beforeEditCache;
  //   }

  //   this.anyRemainingModel = this.anyRemaining();
  //   setTimeout(() => {
  //     todo.editing = false;
  //     this.cdr.detectChanges();
  //   }, 200);
  //   this.todosChanged = true;
  //   todo.modified = true;
  //   this.cdr.detectChanges();
  // }

  // cancelEdit(todo: ProjectTaskToDo): void {
  //   todo.name = this.beforeEditCache;
  //   todo.editing = false;
  //   this.cdr.detectChanges();
  // }

  // deleteTodo(id: number): void {
  //   let index = this.todos.findIndex((item) => item.id == id);
  //   //this.todos.splice(index, 1);
  //   this.todos[index].deleted = true;
  //   this.todos[index].menuOpen = false;
  //   this.todos[index].modified = true;
  //   this.currentTodoName = "";
  //   this.currentTodo = null;
  //   this.note = null;
  //   this.todosChanged = true;
  //   //this.anyRemainingModel = this.anyRemaining();
  //   this.cdr.detectChanges();
  // }

  remaining(): number {
    var filteredTodosAssignedToMe: any[] = [];
    if (!this.showAssignedToMe) {
      filteredTodosAssignedToMe = this.todos.filter((todo) => {
        if (todo.title) {
          return false;
        } else {
          return !todo.checked;
        }
      });
    } else {
      filteredTodosAssignedToMe = this.todos.filter((todo) => {
        if (todo.title || !todo.users.includes(this.currentUser._id as any)) {
          return false;
        } else {
          return !todo.checked;
        }
      });
    }

    var filteredToDosDeleted: any[] = [];
    if (!this.showDeleted) {
      filteredToDosDeleted = this.todos.filter((todo) => {
        if (todo.title) {
          return false;
        } else {
          return !todo.checked;
        }
      });
    } else {
      filteredToDosDeleted = this.todos.filter((todo) => {
        if (todo.title) {
          return false;
        } else {
          return !todo.checked;
        }
      });
    }

    var finalTodoCount: number = 0;
    filteredTodosAssignedToMe.forEach((item) => {
      filteredToDosDeleted.forEach((element) => {
        if (item.id == element.id) {
          finalTodoCount++;
        }
      });
    });

    return finalTodoCount;
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

  // todoDrop(event: CdkDragDrop<number[]>) {
  //   console.log('drop event');
  //   console.log(event);

  //   console.log(this.todos);

  //   let tempTodos: any[] = [];
  //   //make tempTodos array containing only the filtered data
  //   tempTodos = this.todosFiltered();

  //   //find id of item that was moved, and the id of the item next to which the item was moved
  //   let todoPrevId: number = tempTodos[event.previousIndex].id;
  //   let todoCurrentId: number = tempTodos[event.currentIndex].id;

  //   //find the index of the moved item in original array, and find the index of the item next to which the item was moved in the original array
  //   let previousIndex = this.todos.findIndex((item) => item.id == todoPrevId);
  //   let currentIndex = this.todos.findIndex((item) => item.id == todoCurrentId);
  //   moveItemInArray(this.todos, previousIndex, currentIndex);
  // }

  // todoMenuOpen(todo: any) {
  //   console.log(this.todos);
  //   this.currentTodo = todo;
  //   this.note = todo.note;
  //   this.todos.forEach((item) => {
  //     if (item.id == todo.id) {
  //       item.menuOpen = true;
  //     } else {
  //       item.menuOpen = false;
  //     }
  //   });
  // }

  // closeAllTodoMenus() {
  //   this.todos.forEach((item) => {
  //     item.menuOpen = false;
  //   });
  //   this.currentTodo = null;
  //   this.currentTodoName = '';
  //   this.selectedMembers = [];
  //   this.note = null;
  // }

  //skip closing sluzi zbog prvog klika na openTaskMenu. Bez skip closing ti ne da otvorit ga uopce

  // private skipClosing: boolean = false;
  // @HostListener('document:click', ['$event'])
  // clickout(event) {
  //   if (this.todoMenu && !this.skipClosing && !this.dialogIsOpened) {
  //     if (!this.todoMenu.nativeElement.contains(event.target)) {
  //       this.closeAllTodoMenus();
  //     }
  //   }
  //   this.skipClosing = false;
  // }

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
    if (this.note == null && this.currentTodo.hasNote) {
      console.log('Saljemo zahtjev na bekend!');
      // this.todoService.getNote(todo.id, this.type).subscribe(
      //   (data) => {
      //     console.log(data.note);
      //     this.note = data.note;
      //     this.noteDialog.show();
      //     this.cdr.detectChanges();
      //   },
      //   (err) => {
      //     console.log(err);
      //   }
      // );
    } else {
      this.noteDialog.show();
    }
  }
  public onOverlayClickNote: EmitType<object> = () => {
    this.noteDialog.hide();
  };

  // closeNoteDialog() {
  //   console.log(this.note);
  //   this.todos.forEach((item) => {
  //     if (item.id == this.currentTodo?.id) {
  //       if (item.note != this.note) {
  //         this.todosChanged = true;
  //         item.modified = true;
  //       }
  //       item.note = this.note;
  //       if (item.note == null) {
  //         item.note = '';
  //         item.hasNote = false;
  //         console.log(item.note);
  //       }
  //     }
  //   });

  //   //this.noteDialog.hide();
  //   this.dialogIsOpened = false;
  // }

  // quickOpenNote(todo: any) {
  //   this.currentTodo = todo;
  //   this.currentTodoName = todo.name;
  //   this.note = todo.note;
  //   console.log('todo menu open');
  //   this.todos.forEach((item) => {
  //     item.menuOpen = false;
  //   });
  //   this.dialogIsOpened = true;

  //   if (this.note == null && this.currentTodo.hasNote) {
  //     // this.todoService.getNote(todo.id, this.type).subscribe(
  //     //   (data) => {
  //     //     this.note = data.note;
  //     //     this.cdr.detectChanges();
  //     //   },
  //     //   (err) => {
  //     //     console.log(err);
  //     //   }
  //     // );
  //   }
  //   this.noteDialog.show();
  // }

  /*******************************************************************************************/

  /************************************ Mark as Title ****************************************/
  markAsTitle(todo: any) {
    todo.title = !todo.title;
    todo.menuOpen = false;
    todo.modified = true;
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
