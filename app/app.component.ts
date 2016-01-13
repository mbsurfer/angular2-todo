import {Component, Input} from 'angular2/core';
import {TodoListComponent} from './todo-list.component';
import {Todo} from './todo';

declare var _;

@Component({
    selector: 'my-app',
    directives: [TodoListComponent],
    styles: [`
        #filters {
            margin: 0;
            padding: 0;
            list-style: none;
            position: absolute;
            right: 0;
            left: 0;
        }
        #filters li {
            display: inline;
        }
        #filters li a {
            color: inherit;
            margin: 3px;
            padding: 3px 7px;
            text-decoration: none;
            border: 1px solid transparent;
            border-radius: 3px;
        }
        #filters li a.selected, #filters li a:hover {
            border-color: rgba(175, 47, 47, 0.1);
        }
    `],
    template: `
        <section class="todoapp">
            <header class="header">
                <h1>todos</h1>
                <input
                    [(ngModel)]="todoTitle"
                    (keyup.enter)="addTodo()"
                    autofocus="" class="new-todo" placeholder="What needs to be done?">
            </header>
            <section class="main">
                <input class="toggle-all" type="checkbox" (click)="toggleAll()" [checked]="isToggleAll">
                <todo-list [todos]="todos" [filter]="filter" (updateStatus)="updateStatus($event)"></todo-list>
            </section>
            <footer class="footer" [hidden]="todos.length === 0">
                <span class="todo-count" [innerHTML]="status"></span>
                <ul id="filters">
                    <li>
                        <a (click)="removeFilter();" [class.selected]="filter === ''" href="">All</a>
                    </li>
                    <li>
                        <a (click)="setFilter('incomplete');" [class.selected]="filter === 'incomplete'" href="">Incomplete</a>
                    </li>
                    <li>
                        <a (click)="setFilter('completed');" [class.selected]="filter === 'completed'" href="">Completed</a>
                    </li>
                </ul>
                <button class="clear-completed" (click)="clearCompleted()" [hidden]="!(todos.length && completedTodoCount())">Clear completed</button>
            </footer>
        </section>
    `
})
export class AppComponent {

    @Input()
    public todos: Todo[];

    @Input()
    public filter: string;

    public todoTitle: string;
    public isToggleAll: boolean;
    public status: string;

    constructor() {

        this.todos = TODOS;
        this.isToggleAll = false
        this.filter = '';
        this.todoTitle = '';

        this.updateStatus();
    }

    public removeFilter() {
        this.filter = '';
        return false;
    }

    public setFilter(status: string) {
        this.filter = status;
        return false;
    }

    public addTodo() {

        if (this.todoTitle === '') {
            return;
        }

        this.todos = [...this.todos, new Todo(this.todoTitle)];
        this.todoTitle = '';

        this.updateStatus();
    }

    public toggleAll() {
        this.isToggleAll = !this.isToggleAll;
        var status = (this.isToggleAll) ? 'completed' : 'incomplete';
        _.forEach(this.todos, n => n.status = status);
        this.todos = [...this.todos];
        this.updateStatus();
    }

    public clearCompleted() {
        this.todos = [..._.filter(this.todos, n => n.status !== 'completed')];
        this.isToggleAll = false;
        this.updateStatus();
    }

    public updateStatus() {

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
    new Todo('First Item'),
    new Todo('Second Item'),
    new Todo('Third Item')
];