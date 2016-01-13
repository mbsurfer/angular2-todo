import {Component, EventEmitter, Output} from 'angular2/core';
import {Todo} from './todo'
import {TodoStatusPipe} from './todo-status.pipe';

declare var _;

@Component({
    selector: 'todo-list',
    pipes: [TodoStatusPipe],
    inputs: ['todos', 'filter'],
    outputs: ['updateStatus'],
    styles: [`
        .todo-list li {
            overflow: hidden;
        }
        .todo-list li input.edit {
            display: block;
            float: right;
            width: 90%;
        }
        .todo-list li input.edit.hidden {
            display: none;
        }
    `],
    template: `
        <ul class="todo-list">
            <li *ngFor="#todo of todos | todoStatus:filter" [class.completed]="isCompleted(todo)">

                <div class="view" [hidden]="todo.isEditable">
                    <input class="toggle" type="checkbox" (click)="toggleTodo(todo)" [checked]="isCompleted(todo)">
                    <label
                        (dblclick)="edit(todo, editbox)"
                        [contentEditable]="todo.isEditable">{{todo.title}}</label>
                    <button class="destroy" (click)="removeTodo(todo)"></button>
                </div>

                <input #editbox class="edit"
                    (keyup.enter)="save(todo)"
                    (blur)="save(todo)"
                    [(ngModel)]="todo.title"
                    [class.hidden]="!todo.isEditable">

            </li>
        </ul>
    `
})
export class TodoListComponent {
    public todos: Todo[];
    public filter: string;

    @Output()
    public updateStatus = new EventEmitter<Todo>();

    constructor() {
        //
    }

    public edit(todo: Todo, editbox) {
        todo.isEditable = true;
        window.setTimeout(() => editbox.focus(), 100);
    }

    public save(todo: Todo) {
        todo.isEditable = false;
    }

    public toggleTodo(todo: Todo) {
        todo.status = (todo.status === 'completed') ? 'incomplete' : 'completed';

        //need to rebuild todos so that the filter is applied
        const i = this.todos.indexOf(todo);
        this.todos = [
            ...this.todos.slice(0, i),
            todo,
            ...this.todos.slice(i + 1)
        ];

        this.updateStatus.emit(todo);
    }

    public removeTodo(todo: Todo) {
        _.remove(this.todos, n => n === todo);
        this.updateStatus.emit(todo);
    }

    public isCompleted(todo: Todo) {
        return todo.status === 'completed';
    }
}