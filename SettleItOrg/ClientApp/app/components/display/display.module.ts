import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SettleIt } from '../../services/SettleIt'
import { MainData } from '../../services/mainData.service';

import { DisplayComponent } from './display.component';
import { StatementComponent } from './statement/statement.component';
import { ChildrenComponent } from './children/children.component';
import { CitationComponent } from './citation/citation.component';

import { DisplayRoutingModule } from './display-routing.module';


@NgModule({
    declarations: [
        DisplayComponent,
        StatementComponent,
        ChildrenComponent,
        CitationComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        DisplayRoutingModule
    ],
    providers: [SettleIt, MainData]
})
export class DisplayModule {
}
