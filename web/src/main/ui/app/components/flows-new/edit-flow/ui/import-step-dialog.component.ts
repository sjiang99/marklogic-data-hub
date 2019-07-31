import {Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ManageFlowsService } from '../../services/manage-flows.service';
import { EditFlowUiComponent } from './edit-flow-ui.component';
import {Flow} from "../../models/flow.model";

export interface DialogData {
  title: string;
  databases: any;
  entities: any;
  step: any;
  flow: Flow;
  projectDirectory: string;
  isUpdate: boolean;
  isCopy: boolean;
}
@Component({
  selector: 'app-import-step-dialog',
  template: `
  <app-import-step-dialog-ui
    (cancelClicked)="cancelClicked()"
    (nextClicked)="nextClicked($event)"
    [flow]="data.flow"
  ></app-import-step-dialog-ui>
`
})
export class ImportStepDialogComponent {
  collections: string[] = [];
  constructor(
    public dialogRef: MatDialogRef<EditFlowUiComponent>,
    private manageFlowsService: ManageFlowsService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  nextClicked(importedStep) {
    this.dialogRef.close(importedStep);
  }
  cancelClicked(): void {
    this.dialogRef.close(false);
  }
}
