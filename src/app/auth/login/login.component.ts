import {afterNextRender, Component, DestroyRef, inject, viewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {debounceTime} from "rxjs";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [FormsModule,]
})
export class LoginComponent {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      const subscription = this.form().valueChanges?.pipe(
        debounceTime(500),
      ).subscribe({
        next: (value) => {
          console.log(value);
          window.localStorage.setItem('saved-login-form', JSON.stringify(value))
        },
      })

      this.destroyRef.onDestroy(() => {subscription?.unsubscribe()})
    });

  }

  onSubmit(form: NgForm): void {
    if (form.form.invalid) {
      console.log("invalid");
      return;
    }
    console.log(form.form);
    const enteredEmail = form.form.value.email;
    const password = form.form.value.password;
    console.log(enteredEmail, password);

    form.form.reset();
  }
}
