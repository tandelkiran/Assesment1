import { Component, OnInit, AfterViewInit, OnChanges, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from '../../service/employee.service';
import { Employee } from 'src/app/models/employee';
import { Route } from '@angular/compiler/src/core';
@Component({
  selector: 'app-emp-form',
  templateUrl: './emp-form.component.html',
  styleUrls: ['./emp-form.component.scss']
})
export class EmpFormComponent implements OnInit {

  
  empObj: Employee;
  employeeForm: FormGroup;
  submitted = false;
  id;
  emps;
  departments;
  btnValue:string = "SUBMIT";

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute, private http: HttpClient,
    private empService: EmployeeService) {
      this.getAllDepts();
  }

  get f() { return this.employeeForm.controls; }

  // ngAfterViewInit(){
  //   this.getAllDepts();
  // }
  ngOnInit() {
    this.employeeForm = this.formBuilder.group({

      FirstName: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Mobile: ['', [Validators.required]],
      Address: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      DeptName: ['', [Validators.required]],
      HireDate: ['', [Validators.required]],
      Permenent: ['', [Validators.required]]
    });

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.btnValue = "UPDATE";
    }
    if (this.id) {
      this.http.get(`http://localhost:3000/employees/${this.id}`).subscribe(
        data => {
          debugger
          let empData;
          empData = data;
          console.log(empData);
          this.employeeForm.setValue({
            FirstName: empData.FirstName,
            Email: empData.Email,
            Mobile: empData.Mobile,
            Address: empData.Address,
            Gender: empData.Gender,
            DeptName: empData.DeptName,
            HireDate: empData.HireDate,
            Permenent: empData.Permenent
          });
        }
      );
    }
  }

  onSubmit() {
    debugger
    this.submitted = true;

    this.empObj = new Employee();
    if (!this.id && this.btnValue === "SUBMIT" && !this.employeeForm.invalid) {
      this.empObj = this.employeeForm.value;
      this.empService.addEmployeeData(this.empObj).subscribe(data => {
        alert("Employee Added");
      }
      );
    }
    else {
      this.empObj = this.employeeForm.value;
      this.empService.updateEmployeeData(this.id, this.empObj).subscribe(data => {
        alert("Record Updated");
      });
    }
    if (this.employeeForm.invalid) {
      return;
    }
  }

  /**
   * get all departments
   */
  getAllDepts() {
    this.empService.getAllDepts().subscribe(
      data => {
        this.departments = data;
        alert(JSON.stringify(this.departments));
      }
    );
  }
  /**
   * resets form
   */
  onReset() {
    this.submitted = false;
    this.employeeForm.reset();
  }
}
