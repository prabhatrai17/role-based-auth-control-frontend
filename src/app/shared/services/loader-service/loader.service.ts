import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private setLoaderValue$ = new BehaviorSubject<boolean>(false);
  constructor() { }
  setLoader(setValue: boolean) {
    this.setLoaderValue$.next(setValue);

  }
  getLoader() {
    return this.setLoaderValue$;
  }
}
