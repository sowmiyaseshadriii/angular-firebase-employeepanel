import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { Observable } from 'rxjs'; 
import { Employee } from '../../model/Employee';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
 employees:any[];
 total:number;
  constructor(
    public employeeService:EmployeeService
  ) { 
    
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(employees=>{
    this.employees=employees;
    console.log(this.employees);
    this.getTotal();
    });
  }
getTotal(){
  let tot=0;
  for(let i=0;i<this.employees.length;i++){
    tot+=parseFloat(this.employees[i].balance);
    }
    this.total=tot;
    console.log(this.total);
 }
}
