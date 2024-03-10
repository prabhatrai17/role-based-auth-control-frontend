import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { SharedComponentsModule } from './shared/components/shared-components.module';
import { SidebarModule } from 'primeng/sidebar';


import { ApplicationService } from './shared/services/Application/application.service';
import { MessageService } from './shared/services/Message/message.service';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      closeButton: true,
      timeOut: 5000,
      preventDuplicates: true,
      progressAnimation: 'increasing',

    }),
    SharedComponentsModule,
    SidebarModule,
    FormsModule
    
  ],
  providers: [ApplicationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
