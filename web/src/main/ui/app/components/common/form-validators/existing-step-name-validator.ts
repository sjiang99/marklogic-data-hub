import {FormControl, ValidatorFn} from "@angular/forms";
import {Flow} from "../../flows-new/models/flow.model";
import { Step } from '../../flows-new/models/step.model';

export class ExistingStepNameValidator {
  static forbiddenName(flow: Flow, currentStepName: String, isCopy: Boolean, isImport: Boolean): ValidatorFn {
    return (control: FormControl): { [key: string]: any } | null => {
      var forbiddenName;
      if(isCopy || isImport){
         forbiddenName = flow.steps.find((step => (step.name === control.value)));
      }else{
         forbiddenName = flow.steps.find((step => (step.name === control.value && (currentStepName ? currentStepName !== step.name : true)) ));
      }
      return forbiddenName ? {'forbiddenName': {value: control.value}} : null;
    }
  }
}


