import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import {Flow} from "../../models/flow.model";
import {ManageFlowsService} from "../../services/manage-flows.service";
import { FormGroup, FormControl } from '@angular/forms';
import { Step } from '../../models/step.model';

import _ = require('lodash');

@Component({
  selector: 'app-import-step-dialog-ui',
  templateUrl: './import-step-dialog-ui.component.html',
  styleUrls: ['./import-step-dialog-ui.component.scss']
})

export class ImportStepDialogUiComponent implements OnInit {
  @Output() cancelClicked = new EventEmitter();
  @Output() saveClicked = new EventEmitter();
  flowsArray = [];
  stepsArray = [];
  flowId: string;
  flow: Flow;
  selectedFlow: Flow;
  selectedStep: Step;
  importStepForm = new FormGroup({
    flowName: new FormControl(''),
    stepName: new FormControl(''),
  });


  constructor(
    private manageFlowsService: ManageFlowsService,
    // private formBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.getFlows();
    // this.importStepForm = this.formBuilder.group({
    //   flowName: [],
    //   stepName: []
    // })
  }
  
  getFlows(){
    this.manageFlowsService.getFlows().subscribe(resp => {
      _.remove(this.flowsArray, () => {
        return true;
      });
      _.forEach(resp, flow => {
        const flowObject = Flow.fromJSON(flow);
        this.flowsArray.push(flowObject);
      });
    });
  }

  flowSelectionChange(){
    this.selectedFlow = this.importStepForm.value.flowName;
    this.stepsArray = this.selectedFlow.steps;
  }

  stepSelectionChange(){
    this.selectedStep = this.importStepForm.value.stepName;
  }

  onCancel(): void {
    this.cancelClicked.emit();
  }

  onSave() {
    this.saveClicked.emit(this.selectedStep);
  }

}
