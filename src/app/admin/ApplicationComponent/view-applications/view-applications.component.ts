import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationDetails } from 'src/app/Interface/ApplicationDetails';
import { ApplicationService } from 'src/app/shared/services/Application/application.service';
import { MessageService, MessageType } from 'src/app/shared/services/Message/message.service';

@Component({
  selector: 'app-view-applications',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css']
})



export class ViewApplicationsComponent {

    message:MessageType;
    searchQuery:string='';
    applicationsList:ApplicationDetails[]=[];

    constructor(private applicationService:ApplicationService,private route:Router,private messageService:MessageService){

    }
    ngOnInit(){
      this.applicationService.getApplications().subscribe((res)=>{this.applicationsList=res;console.log(res);console.log(this.applicationsList)});
      this.messageService.getMessage().subscribe((res)=>{this.message=res;setTimeout(()=>{this.message=null;},30000)});
    }


    onAdd(){
      this.route.navigateByUrl('/admin/addApplication');
    }

    onEdit(id: number){
      this.route.navigateByUrl('/admin/editApplication/'+id)
    }

    onDelete(id:number){
      this.route.navigateByUrl('/admin/deleteApplication/'+id);
    }    
    
    
    
}
