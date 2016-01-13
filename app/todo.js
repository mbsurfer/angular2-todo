System.register([], function(exports_1) {
    var Todo;
    return {
        setters:[],
        execute: function() {
            Todo = (function () {
                function Todo(title) {
                    if (title === void 0) { title = ''; }
                    this.title = title;
                    this.status = 'incomplete';
                    this.isEditable = false;
                }
                return Todo;
            })();
            exports_1("Todo", Todo);
        }
    }
});
//# sourceMappingURL=todo.js.map