import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpFormComponent } from './components/emp-form/emp-form.component';
import { EmpListComponent } from './components/emp-list/emp-list.component';


const routes: Routes = [
  {
    path : '', 
    component : EmpListComponent
  },
  {
    path : 'empForm', 
    component : EmpFormComponent
  },
  {
    path : 'empForm/:id', 
    component : EmpFormComponent
  },
  {
    path : 'empList', 
    component : EmpListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
