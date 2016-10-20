import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'children',
    template: require('./children.component.html'),
    styles: [require('./children.component.css')],
})
export class ChildrenComponent implements OnInit {
    @Input() children: Statement[];
    constructor() { }
    ngOnInit() {
    }

}

