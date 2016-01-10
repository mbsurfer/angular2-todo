import {Component, EventEmitter} from 'angular2/core';
import {Todo} from './todo.ts';

declare var _;

@Component({
    selector: 'todo-list',
    inputs: ['todos'],
    outputs: ['updateStatus'],
    styles: [`
        .todo-list li {
            overflow: hidden;
        }
        .todo-list li input.edit {
            display: block;
            float: right;
            width: 85%;
        }
        .todo-list li input.edit.hidden {
            display: none;
        }
    `],
    template: `
        <ul class="todo-list">
            <li *ngFor="#todo of todos" [class.completed]="isCompleted(todo)">

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