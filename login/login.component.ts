import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareService } from '../share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, public shareService: ShareService) {
    this.loginForm = this.fb.group({
      firstName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.valid) {
      const loginObj = this.loginForm.value;

      const localuser = localStorage.getItem('user');
      if (localuser != null) {
        const user = JSON.parse(localuser);
        const isUserExist = user.find((user: any) => user.firstName=== loginObj.firstName && user.password === loginObj.password);
        if (isUserExist) {
          alert("Login successful");
          this.router.navigate(['/home']);
        } else {
          alert("Username or password is incorrect");
        }
      }
      this.shareService.userData = loginObj.firstName;
    }
  }
}


