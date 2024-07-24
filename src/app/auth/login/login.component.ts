import {Component, ViewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule,]
})
export class LoginComponent {
  onSubmit(form: NgForm): void {
    console.log(form);
    const enteredEmail = form.form.value.email;
    const password = form.form.value.password;
    console.log(enteredEmail, password);
  }
}
