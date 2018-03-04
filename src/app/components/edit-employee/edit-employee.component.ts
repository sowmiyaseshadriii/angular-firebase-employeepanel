import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../service/employee.service';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { Employee } from '../../model/Employee';
import {SettingsService} from '../../service/settings.service';
@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
id:string;
employee: Employee={
  firstName:'',
  lastName:'',
  email:'',
  phone:'',
  balance:0
}
disableBalanceOnEdit:boolean=true;
  constructor(
    public employeeService: EmployeeService,
    public router: Router,
    public route:ActivatedRoute,
    public flashMessagesService: FlashMessagesService,
    public settingsService:SettingsService

  ) { }

  ngOnInit() {

     this.id=this.route.snapshot.params['id'];
     this.employeeService.getEmployee(this.id).subscribe(employee=>{
      this.employee=employee;
      console.log(this.employee);
    });

    this.disableBalanceOnEdit=this.settingsService.getSettings().disableBalanceOnEdit;
  }

  onSubmit({value, valid}:{value:Employee, valid:boolean}){
   
      if(!valid){
       this.flashMessagesService.show('Please Fill the Fields',
        {cssClass:'alert-danger', timeout: 5000});
       this.router.navigate(['/edit-employee/'+this.id]);
      }else{
      //update
        this.employeeService.updateEmployee(this.id,value);
        this.flashMessagesService.show('Employee Updated!!',
        {cssClass:'alert-success', timeout: 5000});
       this.router.navigate(['/employees/'+this.id]);
      }
    }

}
