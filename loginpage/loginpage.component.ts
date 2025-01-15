import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css'],
  imports: [
    ReactiveFormsModule, 
    MatButtonModule, 
    MatCardModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule,CommonModule
  ]
})
export class LoginpageComponent implements OnInit, OnDestroy {

  images: string[] = [
    'assets/thumbnail_image1.png',
    'assets/thumbnail_image2.png',
    'assets/thumbnail_image3.png'
  ];
  currentindex: number = 0;
  interval: any;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.startAutoslide();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const hardcodedEmail = 'admin@gmail.com';
      const hardcodedPassword = 'admin123';

      if (email === hardcodedEmail && password === hardcodedPassword) {
        alert('Login successful');
        this.router.navigate(['/home']);
      } else {
        alert('Invalid credentials');
      }
    }
  }

  startAutoslide(): void {
    this.interval = setInterval(() => {
      this.nextImage();
    }, 2000);
  }

  nextImage(): void {
    this.currentindex = (this.currentindex + 1) % this.images.length;
  }

  previousImage(): void {
    this.currentindex = (this.currentindex - 1 + this.images.length) % this.images.length;
  }

  goToSlide(index: number): void {
    this.currentindex = index;
    clearInterval(this.interval);
    this.startAutoslide();
  }
}
