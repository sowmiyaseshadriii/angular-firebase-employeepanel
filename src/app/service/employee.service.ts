import { Injectable } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database-deprecated';
import { Observable } from 'rxjs'; 
import { Employee } from '../model/Employee';
@Injectable()
export class EmployeeService {
  
  employees: FirebaseListObservable<any[]>;
  employee: FirebaseObjectObservable<any>;
   
  constructor(
    public af: AngularFireDatabase
  ) {
    this.employees=this.af.list('/employees/') as FirebaseListObservable<Employee[]>;
   }
     
   getEmployees(){
       return this.employees;
    
   }
   newEmployee(employee:Employee){
     this.employees.push(employee);
   }


   getEmployee(id:string){
          this.employee=this.af.object('/employees/'+id) as FirebaseObjectObservable<Employee>;
          return this.employee;
   }

   updateEmployee(id:string, employee:Employee){
        return this.employees.update(id,employee);
   }

   deleteEmployee(id:string){
     return this.employees.remove(id);
   }
}
