import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {debounceTime, of} from "rxjs";


//?マークが含まれていなければエラー
function mustContainQuestionMark(control : AbstractControl){
  if(control.value.includes('?')){
    return null;
  }
  return {
    doesNotContainQuestionMark: true
  };
}

function emailIsUnique(control : AbstractControl){
  if(control.value !== 'test@example.com'){
    return of(null);
  }
  return of({notUnique: true});
}

let initEmailValue = '';
const savedForm = window.localStorage.getItem('loginForm');
if(savedForm) {
  const loadData = JSON.parse(savedForm);
  initEmailValue = loadData.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit{
  private destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl(initEmailValue, {
      validators: [
        Validators.email,
        Validators.required],
      asyncValidators: [emailIsUnique]
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        mustContainQuestionMark],

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
    console.log(this.form);
    console.log(this.form.value.email);
    console.log(this.form.value.password);
  }

  ngOnInit(): void {
    // const savedForm = window.localStorage.getItem('loginForm');
    // if(savedForm){
    //   const loadData = JSON.parse(savedForm);
    //   this.form.patchValue({
    //     email: loadData.email,
    //   });
    // }

    const subscription = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: value => {
        window.localStorage.setItem("loginForm", JSON.stringify(value));
      }
    });
    this.destroyRef.onDestroy(() => {subscription.unsubscribe();});
  }
}
