import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });


  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });


  it('deve iniciar com os campos vazios', () => {

    expect(component.email).toBe('');
    expect(component.password).toBe('');
    expect(component.rememberMe).toBe(false);

  });


  it('deve iniciar com a senha escondida', () => {

    expect(component.showPassword).toBe(false);

  });


  it('deve alternar a visibilidade da senha', () => {

    expect(component.showPassword).toBe(false);

    component.togglePassword();

    expect(component.showPassword).toBe(true);

    component.togglePassword();

    expect(component.showPassword).toBe(false);

  });


  it('deve armazenar o e-mail informado', () => {

    component.email = 'cliente@email.com';

    expect(component.email).toBe('cliente@email.com');

  });


  it('deve armazenar a senha informada', () => {

    component.password = '123456';

    expect(component.password).toBe('123456');

  });

});