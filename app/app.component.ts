import {Component} from 'angular2/core';
import {TodoListComponent} from './todo-list.component';
import {Todo} from './todo.ts';

declare var _;

@Component({
    selector: 'my-app',
    directives: [TodoListComponent],
    template: `
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input
                    [(ngModel)]="newTodo.title"
                    (keyup.enter)="addTodo()"
                    autofocus="" class="new-todo" placeholder="What needs to be done?">
            </header>
            <section class="main">
                <input class="toggle-all" type="checkbox" (click)="toggleAll()" [checked]="isToggleAll">
                <todo-list [todos]="todos" (updateStatus)="updateStatus($event)"></todo-list>
            </section>
            <footer class="footer">
                <span class="todo-count" [innerHTML]="status"></span>
                <button class="clear-completed" (click)="clearCompleted()" [hidden]="!(todos.length && completedTodoCount())">Clear completed</button>
            </footer>
        </section>`
})
export class AppComponent {

    public todos: Todo[];
    public newTodo: Todo;
    public isToggleAll: boolean;
    public status: string;

    constructor() {

        this.todos = TODOS;
        this.isToggleAll = false;

        this._resetNewTodo();
        this.updateStatus();
    }

    private _resetNewTodo() {
        this.newTodo = {
            id: 0,
            title: '',
            status: 'incomplete',
            isEditable: false
        };
    }

    public addTodo() {

        if (this.newTodo.title === "") {
            return;
        }

        var todo = Object.assign({}, this.newTodo);
        todo.id = this.todos.length ? _.last(this.todos).id++ : 1;
        this.todos.push(todo);
        this._resetNewTodo();
        this.updateStatus();
    }

    public toggleAll() {
        this.isToggleAll = !this.isToggleAll;
        var status = (this.isToggleAll) ? 'completed' : 'incomplete';
        _.forEach(this.todos, n => n.status = status);
        this.updateStatus();
    }

    public clearCompleted() {
        _.remove(this.todos, function(n) {
            return n.status === 'completed';
        });
        _.remove(this.todos, n => n.status === 'completed');
        this.isToggleAll = false;
        this.updateStatus();
    }

    public updateStatus() {

        if (this.todos.length === 0) {
            this.status = 'Add some todos';
            return;
        }

        var status = '';
        var incompleteTodoCount = this.incompleteTodoCount();

        if (incompleteTodoCount > 0) {
            status += 'item';
            if (incompleteTodoCount > 1) {
                status += 's';
            }
            status = '<strong>' + incompleteTodoCount + '</strong> ' + status + ' left';
        } else {
            status = '<strong>All done!</strong>';
        }

        this.status = status;
    }

    public incompleteTodoCount() {
        return _.filter(this.todos, n => n.status === 'incomplete').length;
    }

    public completedTodoCount() {
        return _.filter(this.todos, n => n.status === 'completed').length;
    }

}

var TODOS = [
    { id: 1, title: 'First Item', status: 'incomplete', isEditable: false },
    { id: 2, title: 'Second Item', status: 'incomplete', isEditable: false },
    { id: 3, title: 'Third Item', status: 'incomplete', isEditable: false },
]