import { Component, OnInit } from '@angular/core';
import { API_ENDPOINTS, baseUrl } from 'src/app/app-constants';
import { AppService } from 'src/app/shared/services/app-service/app.service';

@Component({
  selector: 'app-applications-container',
  templateUrl: './applications-container.component.html',
  styleUrls: ['./applications-container.component.css']
})
export class ApplicationsContainerComponent implements OnInit {
  applicationsList: any[] = [];
  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.getApplications()
  }
  getApplications() {
    const apiUrl = baseUrl + API_ENDPOINTS.applications.getAllApplications;
    this.appService.get(apiUrl).subscribe(res => {
      console.log(res)
      this.applicationsList = res;
    })
    // this.applicationsList = [
    //   {
    //     "applicationId": 1,
    //     "applicationName": "Allsec",
    //     "applicationURL": "http://localhost:7000/allsec",
    //     "applicationDescription": "Application for payroll\t"
    //   },
    //   {
    //     "applicationId": 2,
    //     "applicationName": "Velocity5",
    //     "applicationURL": "https://ecgy.fa.ap2.oraclecloud.com/hcmUI/faces/FuseWelcome",
    //     "applicationDescription": "user details\t"
    //   },
    //   {
    //     "applicationId": 3,
    //     "applicationName": "Velocity5",
    //     "applicationURL": "http://localhost:7001/velocity",
    //     "applicationDescription": "user details\t"
    //   }, {
    //     "applicationId": 4,
    //     "applicationName": "Velocity5",
    //     "applicationURL": "http://localhost:7001/velocity",
    //     "applicationDescription": "user details\t"
    //   }, {
    //     "applicationId": 5,
    //     "applicationName": "Velocity5",
    //     "applicationURL": "http://localhost:7001/velocity",
    //     "applicationDescription": "user details\t"
    //   }, {
    //     "applicationId": 6,
    //     "applicationName": "Velocity5",
    //     "applicationURL": "http://localhost:7001/velocity",
    //     "applicationDescription": "user details\t"
    //   }, {
    //     "applicationId": 7,
    //     "applicationName": "Velocity5",
    //     "applicationURL": "http://localhost:7001/velocity",
    //     "applicationDescription": "user details\t"
    //   }, {
    //     "applicationId": 8,
    //     "applicationName": "Velocity5",
    //     "applicationURL": "http://localhost:7001/velocity",
    //     "applicationDescription": "user details\t"
    //   }, {
    //     "applicationId": 9,
    //     "applicationName": "Velocity5",
    //     "applicationURL": "http://localhost:7001/velocity",
    //     "applicationDescription": "user details\t"
    //   }, {
    //     "applicationId": 10,
    //     "applicationName": "Velocity5",
    //     "applicationURL": "http://localhost:7001/velocity",
    //     "applicationDescription": "user details\t"
    //   }, {
    //     "applicationId": 11,
    //     "applicationName": "Velocity5",
    //     "applicationURL": "http://localhost:7001/velocity",
    //     "applicationDescription": "user details\t"
    //   }, {
    //     "applicationId": 12,
    //     "applicationName": "Velocity5",
    //     "applicationURL": "http://localhost:7001/velocity",
    //     "applicationDescription": "user details\t"
    //   }
    // ]
  }
  redirectToApplication(url: string) {
    window.open(url);
  }
}
