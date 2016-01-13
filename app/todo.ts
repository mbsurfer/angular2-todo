export class Todo {
    status:string = 'incomplete';
    isEditable:boolean = false;

    constructor(public title:string = ''){}
}