// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { UserService } from './../shared/user.service';
// import { ProfilComponent } from './profil.component';
// import { of, throwError } from 'rxjs';
// import { ActivatedRoute, convertToParamMap } from '@angular/router';
// import { HttpClientModule } from '@angular/common/http';
// import { MatDialogModule } from '@angular/material/dialog';

// describe('ProfilComponent', () => {
//   let component: ProfilComponent;
//   let fixture: ComponentFixture<ProfilComponent>;
//   let userService: UserService;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [ ProfilComponent ],
//       imports: [ HttpClientModule, MatDialogModule ],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             snapshot: {
//               paramMap: convertToParamMap({ id: 1 })
//             }
//           }
//         },
//         UserService
//       ]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ProfilComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call getCurrentUser method on initialization', () => {
//     spyOn(component, 'getCurrentUser');
//     component.ngOnInit();
//     expect(component.getCurrentUser).toHaveBeenCalled();
//   });

//   it('should return user object from getUserById method', () => {
//     const mockUser = {
//       id: 1,
//       name: 'John Doe',
//       email: 'johndoe@example.com',
//     };
//     spyOn(userService, 'getUserById').and.returnValue(of(mockUser));
//     component.getCurrentUser(1);
//     expect(component.User).toEqual(mockUser);
//   });

//   it('should handle error from getUserById method', () => {
//     const mockError = new Error('An error occurred');
//     spyOn(userService, 'getUserById').and.returnValue(throwError(mockError));
//     spyOn(console, 'log');
//     component.getCurrentUser(1);
//     expect(console.log).toHaveBeenCalledWith('erreur', mockError);
//   });
// });
