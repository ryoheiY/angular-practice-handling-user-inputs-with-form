import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.required],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10)],
    }),
  })

  get emailIsInvalid() : boolean{
    return !this.form.controls.email.untouched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid;
  }

  get passwordIsInvalid() : boolean {
    return !this.form.controls.password.untouched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
  }

  onSubmit() : void {
    console.log(this.form.value);
    console.log(this.form.value.email);
    console.log(this.form.value.password);
  }
}
