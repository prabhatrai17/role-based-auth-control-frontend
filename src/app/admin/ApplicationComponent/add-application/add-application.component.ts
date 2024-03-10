import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {tap } from 'rxjs';
import { ApplicationService } from 'src/app/shared/services/Application/application.service';
import { MessageService } from 'src/app/shared/services/Message/message.service';
@Component({
  selector: 'app-add-application',
  templateUrl: './add-application.component.html',
  styleUrls: ['./add-application.component.css']
})
export class AddApplicationComponent{
  
  
  applicationForm:FormGroup;
  isSubmitted:boolean=false;
  constructor(private formBuilder:FormBuilder,private applicationService:ApplicationService,private route:Router
    ,private toastrService:ToastrService){
      this.applicationForm=this.formBuilder.group({
        applicationName:['',[Validators.pattern("^[a-zA-Z][a-zA-Z0-9\\s]{4,}$"),Validators.required]],
        applicationDescription:['',Validators.required],
        applicationURL:['',[Validators.pattern("^(http://localhost:)[0-9]{1,5}(/)*"),Validators.required]]
      })
  }

  ngOnInit(){
   
  }

  onSubmit(){
    this.isSubmitted=true;
    if(this.applicationForm.valid){
      this.applicationService.createApplication(this.applicationForm.value)
      .pipe(tap({
        next:(res)=>{
          this.toastrService.success("application details added successfully");
          this.route.navigateByUrl("/admin/viewApplications");
        },
        error:(error) => {
          this.toastrService.error(error.error);
          this.route.navigateByUrl("/admin/viewApplications");
        }
      })
      )
      .subscribe();
  }
  
  }
}
