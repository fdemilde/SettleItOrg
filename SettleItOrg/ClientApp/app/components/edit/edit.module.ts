import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SettleIt } from '../../services/SettleIt'
import { MainData } from '../../services/mainData.service';

import { EditComponent } from './edit.component';
import { StatementComponent } from './statement/statement.component';
import { EditStatementComponent } from './editStatement/editStatement.component';
import { ChildrenComponent } from './children/children.component';

import { EditRoutingModule } from './edit-routing.module';


@NgModule({
    declarations: [
        EditComponent,
        StatementComponent,
        EditStatementComponent,
        ChildrenComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        EditRoutingModule
    ],
    providers: [SettleIt, MainData]
})
export class EditModule {
}
