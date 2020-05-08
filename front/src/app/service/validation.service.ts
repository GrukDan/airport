import { Injectable } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor(private fb: FormBuilder) { }

  public getUserFormGroup():FormGroup {
    return  this.fb.group({
      userName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[а-яА-ЯёЁa-zA-Z]+$/)]],
      userSurname: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[а-яА-ЯёЁa-zA-Z]+$/)]],
      email: ['', [
        Validators.required,
        Validators.pattern(/^[\w-]+@[\w-]+\.[a-z]{2,4}$/i)]],
      role: ['', [Validators.required]],
      login: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(12),
          Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.max(12),
          Validators.pattern(/^[a-zA-Z0-9]+$/)
        ]
      ]
    })
  }

  public getTaskFormGroup():FormGroup {
    return  this.fb.group({
      taskName: ['',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[ а-яА-ЯёЁa-zA-Z0-9]+$/)]],
      description: ['',
        [
          Validators.minLength(2),
          Validators.maxLength(200)]],
    })
  }
}
