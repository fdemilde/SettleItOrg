import { Injectable} from '@angular/core';
import { StatementComponent } from './statement/statement.component';

@Injectable()
export class DisplayData {
    public statementComponent: StatementComponent;
    public here: boolean;
    constructor() { };
}