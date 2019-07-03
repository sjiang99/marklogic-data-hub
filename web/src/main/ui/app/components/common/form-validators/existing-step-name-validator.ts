import {FormControl, ValidatorFn} from "@angular/forms";
import {Flow} from "../../flows-new/models/flow.model";
import { Step } from '../../flows-new/models/step.model';

export class ExistingStepNameValidator {
  static forbiddenName(flow: Flow, currentStepName: String, isCopy: Boolean): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      var forbiddenName;
      if(isCopy){
         forbiddenName = flow.steps.find((step => (step.name === control.value)));
      }else{
         forbiddenName = flow.steps.find((step => (step.name === control.value && (currentStepName ? currentStepName !== step.name : true)) ));
      }
      flow.steps.find((step) => console.log(step.name))
      console.log("STEP: " + currentStepName);
      return forbiddenName ? {'forbiddenName': {value: control.value}} : null;
    }
  }
}


