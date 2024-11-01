import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareService } from '../share.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, public shareService: ShareService) {






    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
      city: ['', Validators.required],
      state: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  ngOnInit(): void {}

  register() {
    if (this.registerForm.valid) {
      const registerObj = this.registerForm.value;
      this.shareService.userData = registerObj.firstName;

      const localuser = localStorage.getItem('user');
      if (localuser != null) {
        const user = JSON.parse(localuser);
        user.push(registerObj);
        localStorage.setItem('user', JSON.stringify(user));
        alert("Registration successful");
        this.router.navigate(['/Login']);
      } else {
        const user = [];
        user.push(registerObj);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/Login']);
      }
    }
  }
}
