System.register(['angular2/core'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var TodoListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TodoListComponent = (function () {
                function TodoListComponent() {
                    this.updateStatus = new core_1.EventEmitter();
                    //
                }
                TodoListComponent.prototype.edit = function (todo, editbox) {
                    todo.isEditable = true;
                    window.setTimeout(function () { return editbox.focus(); }, 100);
                };
                TodoListComponent.prototype.save = function (todo) {
                    todo.isEditable = false;
                };
                TodoListComponent.prototype.toggleTodo = function (todo) {
                    todo.status = (todo.status === 'completed') ? 'incomplete' : 'completed';
                    this.updateStatus.emit(todo);
                };
                TodoListComponent.prototype.removeTodo = function (todo) {
                    _.remove(this.todos, function (n) { return n === todo; });
                    this.updateStatus.emit(todo);
                };
                TodoListComponent.prototype.isCompleted = function (todo) {
                    return todo.status === 'completed';
                };
                TodoListComponent = __decorate([
                    core_1.Component({
                        selector: 'todo-list',
                        inputs: ['todos'],
                        outputs: ['updateStatus'],
                        styles: ["\n        .todo-list li {\n            overflow: hidden;\n        }\n        .todo-list li input.edit {\n            display: block;\n            float: right;\n            width: 85%;\n        }\n        .todo-list li input.edit.hidden {\n            display: none;\n        }\n    "],
                        template: "\n        <ul class=\"todo-list\">\n            <li *ngFor=\"#todo of todos\" [class.completed]=\"isCompleted(todo)\">\n\n                <div class=\"view\" [hidden]=\"todo.isEditable\">\n                    <input class=\"toggle\" type=\"checkbox\" (click)=\"toggleTodo(todo)\" [checked]=\"isCompleted(todo)\">\n                    <label\n                        (dblclick)=\"edit(todo, editbox)\"\n                        [contentEditable]=\"todo.isEditable\">{{todo.title}}</label>\n                    <button class=\"destroy\" (click)=\"removeTodo(todo)\"></button>\n                </div>\n\n                <input #editbox class=\"edit\"\n                    (keyup.enter)=\"save(todo)\"\n                    (blur)=\"save(todo)\"\n                    [(ngModel)]=\"todo.title\"\n                    [class.hidden]=\"!todo.isEditable\">\n\n            </li>\n        </ul>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], TodoListComponent);
                return TodoListComponent;
            })();
            exports_1("TodoListComponent", TodoListComponent);
        }
    }
});
//# sourceMappingURL=todo-list.component.js.map