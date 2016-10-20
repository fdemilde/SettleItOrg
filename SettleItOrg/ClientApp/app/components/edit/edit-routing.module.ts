import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EditComponent } from './edit.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'edit', component: EditComponent },
      { path: 'edit/:url', component: EditComponent },
      { path: 'The-Legal-System-in-The-United-States-of-America-is-Racist-original', redirectTo: "Is-the-Legal-System-in-The-United-States-of-America-Racist-original" },
      { path: 'Is-the-Legal-System-in-The-United-States-of-America-Racist-original', component: EditComponent },
      { path: 'The-Black-Lives-Matter-movement-is-a-net-detriment-to-society-original', redirectTo: "Is-the-Black-Lives-Matter-movement-a-net-detriment-to-society-original" },
      { path: 'Is-the-Black-Lives-Matter-movement-a-net-detriment-to-society-original', component: EditComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class EditRoutingModule { }
