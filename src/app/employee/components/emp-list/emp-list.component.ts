import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.scss']
})
export class EmpListComponent implements OnInit {

  users: any;
  searchText;
  constructor(private empService: EmployeeService) {
     this.getAllEmp();
  }

  ngOnInit() {
  }

  /**
   * fetch all employee data
   */
  getAllEmp() {
    this.empService.getAllEmployees().subscribe(
      data => {
        this.users = data;
      }
    );
  }

  /**
   * remove employee with given id
   * @param id get employee id
   */
  removeEmp(id: number) {
    debugger
    let res = confirm('Are you sure want to Delete ?');
    console.log(res);
    if (res) {
      this.empService.removeEmployee(id).subscribe(
        data => {
          alert("Record with Id:-" + id + " is Deleted");
          this.getAllEmp();
          console.log(id);
        }
      );
    }
    else {
      return;
    }
  }

}
