import { Component, OnInit, Input } from '@angular/core';
import { SettleIt } from '../edit/SettleIt'
import { MainData } from '../../services/mainData.service';

@Component({
    selector: 'statement',
    template: require('./statement.component.html'),
    styles: [require('./statement.component.css')],

})
export class StatementComponent implements OnInit {
    @Input() statement: Statement;
    selected: boolean;

    constructor(
        private _mainData: MainData
    ) { }

    ngOnInit() {
        if (this.statement.generation == 0)
            this.selected = true;
    }

    toggleOpen() {
        if (this.statement.open == true)
            this.statement.open = false;
        else
            this.statement.open = true;
    }

    select() {
        this._mainData.selected = this.statement;
    }

    addPro() {
        var newStatement = <Statement>{};
        this._mainData.si.step1ValidateStatements(newStatement);
        this.statement.children.push(newStatement);
        this._mainData.calculateAll();
        this.statement.open = true;
    }

    addCon(){
               var newStatement = <Statement>{ isProMain: false};
        this._mainData.si.step1ValidateStatements(newStatement);
        this.statement.children.push(newStatement);
        this._mainData.calculateAll();
        this.statement.open = true; 
    }

}

