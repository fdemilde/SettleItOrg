import { Component, Input } from '@angular/core';
import { SettleIt } from '../../../services/SettleIt'
import { MainData } from '../../../services/mainData.service';

@Component({
    selector: 'editstatement',
    template: require('./editStatement.component.html'),
    styles: [require('./editStatement.component.css')],

})
export class EditStatementComponent {
    @Input() statement: Statement;

    constructor(private mainData: MainData) { }

    calculate() {
        this.mainData.calculateAll();
    }

    addProMain() {
        this.addChild({ isProMain: true });
    }

    addConMain() {
        this.addChild({ isProMain: false });
    }

    addProParent() {
        this.addChild(<Statement>{ isProParent: true });
    }

    addConParent() {
        this.addChild(<Statement>{ isProParent: false });
    }

    private addChild(newStatement: Statement) {
        this.mainData.si.step1ValidateStatements(newStatement,this.statement);
        this.statement.children.push(newStatement);
        this.mainData.calculateAll();
        this.statement.open = true;
    }
}

