import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiUrl = 'http://localhost:3000/employees/';
  deptUrl="http://localhost:3000/department";

  constructor(private http: HttpClient) { }

  getAllDepts(){
    return this.http.get(this.deptUrl);
  }

  getAllEmployees() {
    return this.http.get(this.apiUrl);
  }

  /**
   * add new employee service method
   * @param emps employee object
   */
  addEmployeeData(emps: Employee) {
    debugger
    return this.http.post(this.apiUrl, emps);
  }

  /**
   * update employee service method
   * @param emps single employee data
   */
  updateEmployeeData(id:number,emps) {
    debugger
    console.log(emps.id);
    return this.http.put(this.apiUrl+`${id}`, emps);
  }


  removeEmployee(id: number): Observable<any> {
    debugger
    return this.http.delete(this.apiUrl + id);
  }
}
