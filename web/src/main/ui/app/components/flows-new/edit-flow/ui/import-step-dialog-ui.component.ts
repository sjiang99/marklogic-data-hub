import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import {Flow} from "../../models/flow.model";
import {ManageFlowsService} from "../../services/manage-flows.service";
import { FormGroup, FormControl } from '@angular/forms';
import { Step } from '../../models/step.model';
import * as _ from "lodash";

@Component({
  selector: 'app-import-step-dialog-ui',
  templateUrl: './import-step-dialog-ui.component.html',
  styleUrls: ['./import-step-dialog-ui.component.scss']
})

export class ImportStepDialogUiComponent implements OnInit {
  @Output() cancelClicked = new EventEmitter();
  @Output() nextClicked = new EventEmitter();
  @Input() flow: Flow;
  flowsArray = [];
  stepsArray = [];
  flowId: string;
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
  }
  
  getFlows(){
    this.manageFlowsService.getFlows().subscribe(resp => {
      if(resp){
        _.remove(this.flowsArray, () => {
          return true;
        });
        _.forEach(resp, flow => {
          const flowObject = Flow.fromJSON(flow);
          this.flowsArray.push(flowObject);
        });
        //remove own flow from flowsArray
        for(var i = 0; i < this.flowsArray.length; i++){
          if(this.flowsArray[i].name === this.flow.name){
            this.flowsArray.splice(i,1);
          }
        }
      }
    });
  }

  flowSelectionChange(){
    this.selectedFlow = this.importStepForm.value.flowName;
    this.manageFlowsService.getSteps(this.selectedFlow.name).subscribe(resp => {
      if(resp){
        this.stepsArray = resp;
        console.log("array:", this.stepsArray);
      }
    });
  }

  stepSelectionChange(){
    this.selectedStep = this.importStepForm.value.stepName;
    console.log('step:', this.selectedStep)
  }

  onCancel(): void {
    this.cancelClicked.emit();
  }

  onNext() {
    const importedStep = {step: this.selectedStep, stepName: this.selectedStep.name, flowName: this.selectedFlow.name}
    this.nextClicked.emit(importedStep);
  }

}
