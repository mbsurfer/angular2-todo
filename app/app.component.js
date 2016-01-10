System.register(['angular2/core', './todo-list.component'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, todo_list_component_1;
    var AppComponent, TODOS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_list_component_1_1) {
                todo_list_component_1 = todo_list_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.todos = TODOS;
                    this.isToggleAll = false;
                    this._resetNewTodo();
                    this.updateStatus();
                }
                AppComponent.prototype._resetNewTodo = function () {
                    this.newTodo = {
                        id: 0,
                        title: '',
                        status: 'incomplete',
                        isEditable: false
                    };
                };
                AppComponent.prototype.addTodo = function () {
                    if (this.newTodo.title === "") {
                        return;
                    }
                    var todo = Object.assign({}, this.newTodo);
                    todo.id = this.todos.length ? _.last(this.todos).id++ : 1;
                    this.todos.push(todo);
                    this._resetNewTodo();
                    this.updateStatus();
                };
                AppComponent.prototype.toggleAll = function () {
                    this.isToggleAll = !this.isToggleAll;
                    var status = (this.isToggleAll) ? 'completed' : 'incomplete';
                    _.forEach(this.todos, function (n) { return n.status = status; });
                    this.updateStatus();
                };
                AppComponent.prototype.clearCompleted = function () {
                    _.remove(this.todos, function (n) {
                        return n.status === 'completed';
                    });
                    _.remove(this.todos, function (n) { return n.status === 'completed'; });
                    this.isToggleAll = false;
                    this.updateStatus();
                };
                AppComponent.prototype.updateStatus = function () {
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
                    }
                    else {
                        status = '<strong>All done!</strong>';
                    }
                    this.status = status;
                };
                AppComponent.prototype.incompleteTodoCount = function () {
                    return _.filter(this.todos, function (n) { return n.status === 'incomplete'; }).length;
                };
                AppComponent.prototype.completedTodoCount = function () {
                    return _.filter(this.todos, function (n) { return n.status === 'completed'; }).length;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        directives: [todo_list_component_1.TodoListComponent],
                        template: "\n        <section class=\"todoapp\">\n            <header class=\"header\">\n                <h1>todos</h1>\n                <input\n                    [(ngModel)]=\"newTodo.title\"\n                    (keyup.enter)=\"addTodo()\"\n                    autofocus=\"\" class=\"new-todo\" placeholder=\"What needs to be done?\">\n            </header>\n            <section class=\"main\">\n                <input class=\"toggle-all\" type=\"checkbox\" (click)=\"toggleAll()\" [checked]=\"isToggleAll\">\n                <todo-list [todos]=\"todos\" (updateStatus)=\"updateStatus($event)\"></todo-list>\n            </section>\n            <footer class=\"footer\">\n                <span class=\"todo-count\" [innerHTML]=\"status\"></span>\n                <button class=\"clear-completed\" (click)=\"clearCompleted()\" [hidden]=\"!(todos.length && completedTodoCount())\">Clear completed</button>\n            </footer>\n        </section>"
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
            TODOS = [
                { id: 1, title: 'First Item', status: 'incomplete', isEditable: false },
                { id: 2, title: 'Second Item', status: 'incomplete', isEditable: false },
                { id: 3, title: 'Third Item', status: 'incomplete', isEditable: false },
            ];
        }
    }
});
//# sourceMappingURL=app.component.js.map