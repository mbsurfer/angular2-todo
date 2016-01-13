System.register(['angular2/core', './todo-list.component', './todo'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, todo_list_component_1, todo_1;
    var AppComponent, TODOS;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (todo_list_component_1_1) {
                todo_list_component_1 = todo_list_component_1_1;
            },
            function (todo_1_1) {
                todo_1 = todo_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.todos = TODOS;
                    this.isToggleAll = false;
                    this.filter = '';
                    this.todoTitle = '';
                    this.updateStatus();
                }
                AppComponent.prototype.removeFilter = function () {
                    this.filter = '';
                    return false;
                };
                AppComponent.prototype.setFilter = function (status) {
                    this.filter = status;
                    return false;
                };
                AppComponent.prototype.addTodo = function () {
                    if (this.todoTitle === '') {
                        return;
                    }
                    this.todos = this.todos.concat([new todo_1.Todo(this.todoTitle)]);
                    this.todoTitle = '';
                    this.updateStatus();
                };
                AppComponent.prototype.toggleAll = function () {
                    this.isToggleAll = !this.isToggleAll;
                    var status = (this.isToggleAll) ? 'completed' : 'incomplete';
                    _.forEach(this.todos, function (n) { return n.status = status; });
                    this.todos = this.todos.slice();
                    this.updateStatus();
                };
                AppComponent.prototype.clearCompleted = function () {
                    this.todos = _.filter(this.todos, function (n) { return n.status !== 'completed'; }).slice();
                    this.isToggleAll = false;
                    this.updateStatus();
                };
                AppComponent.prototype.updateStatus = function () {
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
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], AppComponent.prototype, "todos", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], AppComponent.prototype, "filter", void 0);
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        directives: [todo_list_component_1.TodoListComponent],
                        styles: ["\n        #filters {\n            margin: 0;\n            padding: 0;\n            list-style: none;\n            position: absolute;\n            right: 0;\n            left: 0;\n        }\n        #filters li {\n            display: inline;\n        }\n        #filters li a {\n            color: inherit;\n            margin: 3px;\n            padding: 3px 7px;\n            text-decoration: none;\n            border: 1px solid transparent;\n            border-radius: 3px;\n        }\n        #filters li a.selected, #filters li a:hover {\n            border-color: rgba(175, 47, 47, 0.1);\n        }\n    "],
                        template: "\n        <section class=\"todoapp\">\n            <header class=\"header\">\n                <h1>todos</h1>\n                <input\n                    [(ngModel)]=\"todoTitle\"\n                    (keyup.enter)=\"addTodo()\"\n                    autofocus=\"\" class=\"new-todo\" placeholder=\"What needs to be done?\">\n            </header>\n            <section class=\"main\">\n                <input class=\"toggle-all\" type=\"checkbox\" (click)=\"toggleAll()\" [checked]=\"isToggleAll\">\n                <todo-list [todos]=\"todos\" [filter]=\"filter\" (updateStatus)=\"updateStatus($event)\"></todo-list>\n            </section>\n            <footer class=\"footer\" [hidden]=\"todos.length === 0\">\n                <span class=\"todo-count\" [innerHTML]=\"status\"></span>\n                <ul id=\"filters\">\n                    <li>\n                        <a (click)=\"removeFilter();\" [class.selected]=\"filter === ''\" href=\"\">All</a>\n                    </li>\n                    <li>\n                        <a (click)=\"setFilter('incomplete');\" [class.selected]=\"filter === 'incomplete'\" href=\"\">Incomplete</a>\n                    </li>\n                    <li>\n                        <a (click)=\"setFilter('completed');\" [class.selected]=\"filter === 'completed'\" href=\"\">Completed</a>\n                    </li>\n                </ul>\n                <button class=\"clear-completed\" (click)=\"clearCompleted()\" [hidden]=\"!(todos.length && completedTodoCount())\">Clear completed</button>\n            </footer>\n        </section>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
            TODOS = [
                new todo_1.Todo('First Item'),
                new todo_1.Todo('Second Item'),
                new todo_1.Todo('Third Item')
            ];
        }
    }
});
//# sourceMappingURL=app.component.js.map