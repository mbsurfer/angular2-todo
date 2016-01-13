import {Pipe} from "angular2/core";

@Pipe({
    name: 'todoStatus'
})
export class TodoStatusPipe {
    transform(todos, args: any[]){
        var status = args[0];
        if (status === "") return todos;
        return todos.filter((todo) => todo.status === status)
    }
}