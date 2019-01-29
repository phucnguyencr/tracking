import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { TokenService } from '../services/tokenService';
import { Helpers } from '../helpers/helpers';
import { AppConfig } from '../config/config';
import { getValidationErrors, hasInvalidRequire, hasInvalidLength } from '../utils/getValidationsForm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [TokenService, AppConfig]
})
export class LoginComponent implements OnInit {

  constructor(private helpers: Helpers, private router: Router, private tokenService: TokenService) { }
  isShow;
  errString;
  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });

  ngOnInit() {
    this.isShow = false;
    this.errString = '';
  }

  login(): void {
    const isValid = this.loginForm.valid;
    if (!isValid) {
      const errors = getValidationErrors(this.loginForm);
      const requiredField = hasInvalidRequire(errors);
      this.isShow = true;
      if (requiredField) {
        this.errString = '<strong>User Name</strong> and <strong>Password</strong> are required.';
        return;
      }
      const validLength = hasInvalidLength(errors);
      if (validLength) {
        this.errString = '<strong>User Name</strong> and <strong>Password</strong> are invalid.';
        return;
      }
    } else {
      this.tokenService.auth(this.loginForm.value).subscribe(token => {
        this.helpers.setToken(token);
        this.router.navigate(['adminpanel']);
      });
    }
  }

}
