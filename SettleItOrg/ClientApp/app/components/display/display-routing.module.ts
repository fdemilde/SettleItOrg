import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DisplayComponent } from './display.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'display', component: DisplayComponent },
            { path: 'display/:url', component: DisplayComponent },
            { path: 'The-Legal-System-in-The-United-States-of-America-is-Racist-original', redirectTo: "Is-the-Legal-System-in-The-United-States-of-America-Racist-original" },
            { path: 'Is-the-Legal-System-in-The-United-States-of-America-Racist-original', component: DisplayComponent },
            { path: 'The-Black-Lives-Matter-movement-is-a-net-detriment-to-society-original', redirectTo: "Is-the-Black-Lives-Matter-movement-a-net-detriment-to-society-original" },
            { path: 'Is-the-Black-Lives-Matter-movement-a-net-detriment-to-society-original', component: DisplayComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class DisplayRoutingModule { }
