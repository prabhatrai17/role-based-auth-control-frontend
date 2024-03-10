import { Pipe, PipeTransform } from "@angular/core";
import { ApplicationDetails } from "src/app/Interface/ApplicationDetails";

@Pipe({
    name: 'search'
  })
  export class SearchPipe implements PipeTransform {
    transform(applicationsList:ApplicationDetails[],searchTerm:string) {
        if (!searchTerm || !applicationsList) {
            return applicationsList;
          }
          const lowerSearchTerm = searchTerm.toLowerCase();
          return applicationsList.filter(application => 
            application.applicationName.toLowerCase().includes(lowerSearchTerm));
    }

  }
  