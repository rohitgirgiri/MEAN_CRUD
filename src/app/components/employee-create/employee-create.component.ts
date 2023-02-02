import { Router } from '@angular/router';
import { ApiService } from './../../service/api.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})

export class EmployeeCreateComponent implements OnInit {
  Employee: any = [];
  submitted = false;
  employeeForm: FormGroup;
  EmployeeProfile: any = ['Cricket', 'Music', 'Guitar', 'Story writing', 'Reading'];

  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.readEmployee();

    this.mainForm();
  }

  ngOnInit() {}

  mainForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      // datepicker: ['', Validators.required],
      hobbies: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      datepicker : ['', [Validators.required]],
      gender: ['', Validators.required],
      status : ['', Validators.nullValidator],
    });
  }

  // Choose designation with select dropdown
  updateProfile(e) {
    this.employeeForm.get('hobbies').setValue(e, {
      onlySelf: true,
    });
  }

  // Getter to access form control
  get myForm() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
  
    if (!this.employeeForm.valid) {
      alert("Enter data in correct format")
      return false;
    } else {

      
       console.log(this.employeeForm.value)
      return this.apiService.createEmployee(this.employeeForm.value).subscribe({
        complete: () => {
          console.log('Employee successfully created!'),
            // this.ngZone.run(() => this.router.navigateByUrl('/create-employee'));
            this.readEmployee();
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }
  readEmployee() {
    this.apiService.getEmployees().subscribe((data) => {
      this.Employee = data;
    });
  }

  removeEmployee(employee, index) {
    if (window.confirm('Are you sure?')) {
      this.apiService.deleteEmployee(employee._id).subscribe((data) => {
        this.Employee.splice(index, 1);
      });
    }
  }
  ClearForm(){
    
  }
}
