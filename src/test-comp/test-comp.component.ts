import {
  FormBuilder,
  FormGroup,
  Validators as AngularValidators,
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Import OnInit from @angular/core
import { Component, OnInit } from '@angular/core';


// Define a Field interface
interface Field {
  name: string;
  label: string;
  type: 'text' | 'checkbox' | 'select'; // Add 'select' as a valid type
  options?: string[]; // Options for the dropdown list
  validators?: string[];
  regex?: string; // Regular expression for custom validation
}

// Custom mapping of validator names to actual validator functions
const customValidators: { [key: string]: ValidatorFn } = {
  required: AngularValidators.required,
  // Add more validators as needed
};

@Component({
  selector: 'app-test-comp',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './test-comp.component.html',
  styleUrls: ['./test-comp.component.css'],
})
export class TestCompComponent implements OnInit {
  myForm: FormGroup = this.fb.group({});
  jsonConfig: { fields: Field[] } = { fields: [] }; // Initialize in the constructor

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.jsonConfig = {
      fields: [
        {
          name: 'firstname',
          label: 'First Name',
          type: 'text',
          validators: ['required'],
          regex: '^[a-zA-Z]+$', // Example regex for alphabetic characters only
        },
        {
          name: 'lastname',
          label: 'Last Name',
          type: 'text',
          validators: ['required'],
        },
        {
          name: 'subscribe',
          label: 'Subscribe',
          type: 'checkbox',
          validators: [],
        },
        {
          name: 'country',
          label: 'Country',
          type: 'select',
          options: ['USA', 'Canada', 'UK'],
          validators: ['required'],
        },
      ],
    };

    this.createForm();
  }

  createForm(): void {
    const formGroupConfig: { [key: string]: any } = {}; // Define the type of formGroupConfig

    this.jsonConfig.fields.forEach((field) => {


      switch (field.type) {
        case 'text':
          // Handle text type
          console.log('Text field');
          break;
        case 'checkbox':
          // Handle checkbox type
          console.log('Checkbox field');
          formGroupConfig[field.name] = [false];
          break;
        case 'select':
          // Handle select type
          console.log('Select field');
          break;
        // Add more cases as needed
        default:
          // Handle default case or unexpected type
          console.log('Unknown field type');
      }
    

    formGroupConfig[field.name] = [
      '',
      [
      ...(field.validators ? this.mapValidators(field.validators) : []), // Spread validators array
      ...(field.regex ? [this.regexValidator(field.regex)] : []) // Spread regexValidator array
      ]
    ];

  });
    console.log(formGroupConfig);
    this.myForm = this.fb.group(formGroupConfig);
  }

  // Helper function to map validator names to actual validator functions
  mapValidators(validatorNames: string[]): ValidatorFn[] {
    return validatorNames.map((name) => customValidators[name]);
  }

  regexValidator(regex: string | undefined) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!regex) {
        return null; // No regex provided, validation passes
      }

      const valid = new RegExp(regex).test(control.value);
      return valid ? null : { regex: true };
    };
  }

  onSubmit(): void {
    // Handle form submission logic here
    console.log(this.myForm.value);
  }
}
