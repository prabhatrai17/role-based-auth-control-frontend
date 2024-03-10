import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { ApplicationDetails } from 'src/app/Interface/ApplicationDetails';
import { ApplicationService } from 'src/app/shared/services/Application/application.service';
import { MessageService } from 'src/app/shared/services/Message/message.service';

@Component({
  selector: 'app-edit-application',
  templateUrl: './edit-application.component.html',
  styleUrls: ['./edit-application.component.css']
})
export class EditApplicationComponent {
  applicationForm:FormGroup;
  isSubmitted:boolean=false;
  application:ApplicationDetails | undefined;

  constructor(private formBuilder:FormBuilder,private applicationService:ApplicationService,
    private toastrService:ToastrService,private route:Router,private activatedRoute:ActivatedRoute){
    this.applicationForm=this.formBuilder.group({
      applicationId:[''],
      applicationName:['',[Validators.pattern("^[a-zA-Z][a-zA-Z0-9\\s]{4,}$"),Validators.required]],
      applicationDescription:['',Validators.required],
      applicationURL:['',[Validators.pattern("^(http://localhost:)[0-9]{1,5}(/)*"),Validators.required]]
      
    })
  
  }

  ngOnInit(){
    
    this.applicationService.getApplicationById(this.activatedRoute.snapshot.params['id'])
    .subscribe((res)=>{this.application=res;this.applicationForm.setValue(this.application);});
  }

  ngAfterViewInit(){
    //this.applicationForm.setValue(this.application);
    
  }

  ngAfterViewChecked(){
    //this.applicationForm.setValue(this.application);
  }


  onSubmit(){
    this.isSubmitted=true;
    if(this.applicationForm.valid){
      this.applicationService.editApplication(this.activatedRoute.snapshot.params['id'],this.applicationForm.value)
      .pipe(tap({
        next:(res)=>{this.route.navigateByUrl("/admin/viewApplications");
        this.toastrService.success("application details updated successfully");
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
