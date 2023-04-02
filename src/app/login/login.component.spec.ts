import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [HttpClientTestingModule,FormsModule, ReactiveFormsModule,MatDialogModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

//Test that the component renders the login form with the correct fields:
it('should call the onSubmit method when the form is submitted', () => {
  spyOn(component, 'onSubmit');
  const form = fixture.debugElement.query(By.css('form'));
  form.triggerEventHandler('ngSubmit', null);
  expect(component.onSubmit).toHaveBeenCalled();
});

it('should make the form invalid when empty', () => {
  component.model.email = '';
  component.model.password = '';
  const form = fixture.debugElement.query(By.css('form')).nativeElement as HTMLFormElement;
  form.dispatchEvent(new Event('ngSubmit'));
  fixture.detectChanges();
  expect(form.valid).toBeFalsy();
});






});
