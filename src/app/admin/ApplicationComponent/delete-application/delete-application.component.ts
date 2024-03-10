import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApplicationService } from 'src/app/shared/services/Application/application.service';

@Component({
  selector: 'app-delete-application',
  templateUrl: './delete-application.component.html',
  styleUrls: ['./delete-application.component.css']
})
export class DeleteApplicationComponent {
    constructor(private applicationService:ApplicationService,private toastrService:ToastrService
      ,private route:Router,private activatedRoute:ActivatedRoute){

    }

    ngOnInit(){
      this.applicationService.deleteApplication(this.activatedRoute.snapshot.params['id']).subscribe(
        (res)=>{
          this.toastrService.success("deleted application successfully");
          this.route.navigateByUrl("/admin/viewApplications");},(error)=>{console.log(error);}
        )
      
    }
}
