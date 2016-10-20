import { Component, Input } from '@angular/core';
import { SettleIt } from '../edit/SettleIt'
import { MainData } from '../../services/mainData.service';

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
}

