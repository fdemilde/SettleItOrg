import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SettleIt } from './components/edit/SettleIt'
import { MainData } from './services/mainData.service';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { EditComponent } from './components/edit/edit.component';
import { StatementComponent } from './components/statement/statement.component';
import { EditStatementComponent } from './components/editStatement/editStatement.component';
import { ChildrenComponent } from './components/children/children.component';
//import { BlogComponent } from './components/blog/blog.component';
import { RedirectComponent } from './components/redirect/redirect.component';

import { EditRoutingModule } from './components/edit/edit-routing.module';
import { BlogRoutingModule } from './components/blog/blog-routing.module';


@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        EditComponent,
        HomeComponent,
        StatementComponent,
        EditStatementComponent,
        RedirectComponent,
        ChildrenComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        EditRoutingModule,
        BlogRoutingModule,
        RouterModule.forRoot([
            { path: '', component: HomeComponent },
            { path: 'RoddenberryPrizeVideo', component: RedirectComponent },
            { path: 'RoddenberryPrize', component: HomeComponent },
            { path: '**', redirectTo: '' }
            //The-Black-Lives-Matter-movement-is-a-net-detriment-to-society-original
        ])
    ],
    providers: [SettleIt, MainData]
})
export class AppModule {
}
