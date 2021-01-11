import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/providers/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$')]],
      senha: ['', Validators.required],
    });
  }

  login(): void {
    this.submitted = true;

    if (this.formGroup.valid) {
      this.authService.logar(this.formGroup.value);
    }
  }

  hasError(field: string) {
    return this.formGroup.get(field).errors;
  }
}
