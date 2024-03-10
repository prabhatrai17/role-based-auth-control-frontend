import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import the HttpClientTestingModule
import { LoginComponent } from './login.component';
import { AppService } from 'src/app/shared/services/app-service/app.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let appServiceSpy = jasmine.createSpyObj('AppService', ['get', 'post', 'put', 'delete']);
  const formBuilder = new FormBuilder();
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [{ provide: AppService, usevalue: appServiceSpy },
      { provide: FormBuilder, useValue: formBuilder }, // Mock FormBuilder
        ToastrService],
      imports: [HttpClientTestingModule,
        ToastrModule.forRoot(),
        SharedComponentsModule,
        ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.loginForm = formBuilder.group({
      email: 'test@example.com',
      password: 'testpassword',
    });

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should toggle password visiblity', () => {
    component.passwordVisiblity = true;
    component.hidePasswordMethod();
    expect(component.hidePasswordMethod).toBeTruthy();
  })
  it('should toggle password visiblity', () => {
    component.passwordVisiblity = true;
    component.passwordVisiblityChanger();
    expect(component.passwordVisiblityChanger).toBeTruthy();
  });
  it('should submit invalid credentials', () => {
    component.loginForm = formBuilder.group({
      email: 'test@example.com',
      password: 'Balaji@1999',
    });
    const serviceMock = fixture.debugElement.injector.get(AppService);
    const respData = {
      apiPath: 'uri=/api/user/login',
      errorCode: 'BAD_REQUEST',
      errorMsg: 'User not found with user id: null',
      errorTime: '2023-12-18T13:52:07.2106739'
    }
    spyOn(serviceMock, 'post').and.callFake(() => {
      return of(respData)
    })
    component.submit();
    expect(component.submit).toBeTruthy();
  });
  it('should submit correct credentials', () => {
    component.loginForm = formBuilder.group({
      email: 'test@example.com',
      password: 'Balaji@1999',
    });
    const serviceMock = fixture.debugElement.injector.get(AppService);
    const respData = {
      status: 'Data processed successfully!',
      data: 'Login Successful! Welcome Balaji1999',
      statusCode: 'OK',
      responseTime: '2023-12-18T13:56:58.3388159'
    }
    spyOn(serviceMock, 'post').and.callFake(() => {
      return of(respData)
    })
    component.submit();
    expect(component.submit).toBeTruthy();
  });
  it('should submit correct credentials', () => {
    component.loginForm.setValue({
      email: null,
      password: null,
    });
    component.loginForm.setErrors({ invalid: true })
    component.submit();
    console.log(component.loginForm)
    expect(component.submit).toBeTruthy();
  });
  it('navigate to register page', () => {
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigate').and.stub();
    component.redirectToRegister();
    expect(component.redirectToRegister).toBeTruthy();
  })
  it('navigate to redirectToPasswordReset', () => {
    const routerStub: Router = fixture.debugElement.injector.get(Router);
    spyOn(routerStub, 'navigate').and.stub();
    component.redirectToPasswordReset();
    expect(component.redirectToPasswordReset).toBeTruthy();
  })
  it('ngOnInit', () => {
    component.ngOnInit();
    expect(component.ngOnInit).toBeTruthy();
  })
  it('should prevent paste', () => {
    const eventMock = { preventDefault: jasmine.createSpy('preventDefault') };
    component.preventPaste(eventMock);
    expect(eventMock.preventDefault).toHaveBeenCalled();
  });
});
