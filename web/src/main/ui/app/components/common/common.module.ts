import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {RouterModule} from '@angular/router';
import {HttpErrorComponent} from './http-error/http-error.component';
import {ConfirmationDialogComponent} from "./confirm-dialog/confirm-dialog.component";
import {CopyDialogComponent} from "./copy-dialog/copy-dialog.component";
import {InfoLabelComponent} from "./info-label/info-label-component";
import {SpinnerComponent} from './spinner/spinner.component';
import {MaterialModule} from "../theme/material.module";
import {TooltipModule} from "ngx-bootstrap";


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    TooltipModule.forRoot(),
    RouterModule
  ],
  exports: [
    ConfirmationDialogComponent,
    CopyDialogComponent,
    InfoLabelComponent,
    SpinnerComponent,
    HttpErrorComponent
  ],
  declarations: [
    ConfirmationDialogComponent,
    CopyDialogComponent,
    InfoLabelComponent,
    SpinnerComponent,
    HttpErrorComponent
  ],
  providers: [],
  entryComponents: [ConfirmationDialogComponent, CopyDialogComponent]
})
export class AppCommonModule {
}
