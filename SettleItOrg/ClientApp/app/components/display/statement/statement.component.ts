import { Component, OnInit, Input } from '@angular/core';
import { SettleIt } from '../../../services/SettleIt'
import { MainData } from '../../../services/mainData.service';
import { DisplayData } from '../displayData.service';


@Component({
    selector: 'statement',
    template: require('./statement.component.html'),
    styles: [require('./statement.component.css')],

})
export class StatementComponent implements OnInit {
    @Input() statement: Statement;
    selected: boolean;

    constructor(
        private _mainData: MainData,
        private _displayData: DisplayData
    ) { }

    ngOnInit() {
        if (this.statement.generation == 0)
            this.select();
    }

    toggleOpen() {
        if (this.statement.open == true)
            this.statement.open = false;
        else
            this.statement.open = true;
    }

    select() {
        if (this._displayData.statementComponent)
            this._displayData.statementComponent.selected = false;
        this._displayData.statementComponent = this;
        this.selected = true;
    }

    addPro() {
        var newStatement = <Statement>{};
        this._mainData.si.step1ValidateStatements(newStatement);
        this.statement.children.push(newStatement);
        this._mainData.calculateAll();
        this.statement.open = true;
    }

    addCon() {
        var newStatement = <Statement>{ isProMain: false };
        this._mainData.si.step1ValidateStatements(newStatement);
        this.statement.children.push(newStatement);
        this._mainData.calculateAll();
        this.statement.open = true;
    }

}

