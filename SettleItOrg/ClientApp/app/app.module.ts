import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { FormsModule } from '@angular/forms';

import { SettleIt } from './services/SettleIt'
import { MainData } from './services/mainData.service';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { RedirectComponent } from './components/redirect/redirect.component';

import { EditModule } from './components/edit/edit.module';
import { EditRoutingModule } from './components/edit/edit-routing.module';
import { DisplayModule } from './components/display/display.module';
import { DisplayRoutingModule } from './components/display/display-routing.module';
import { BlogRoutingModule } from './components/blog/blog-routing.module';


@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        RedirectComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        EditRoutingModule,
        DisplayRoutingModule,
        BlogRoutingModule,
        EditModule,
        DisplayModule,
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
