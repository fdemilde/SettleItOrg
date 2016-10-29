import { Component, Input } from '@angular/core';
import { SettleIt } from '../../../services/SettleIt'
import { MainData } from '../../../services/mainData.service';

@Component({
    selector: 'citation',
    template: require('./citation.component.html'),
    styles: [require('./citation.component.css')],

})
export class CitationComponent {
    @Input() statement: Statement;
    constructor(
    ) { }

}

