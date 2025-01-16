import { Component, OnInit, OnDestroy, ChangeDetectorRef, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';  // Import for platform check

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit, OnDestroy, AfterViewInit {
  images: string[] = [
    'assets/thumbnail_image1.png',
    'assets/thumbnail_image2.png',
    'assets/thumbnail_image3.png'
  ];
  currentindex: number = 0;
  interval: any;
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: any // Inject platformId to check if it's running in browser or SSR
  ) {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Initialization logic goes here (only runs on the client-side)
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Delay the auto-slide only when running in the browser (not SSR)
      setTimeout(() => {
        this.startAutoslide();
      }, 500); // Delay to allow rendering to complete
    }
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval); // Clear the interval to prevent memory leaks
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      const hardcodedEmail = 'admin@dragonfly.com';
      const hardcodedPassword = 'admin';

      if (email === hardcodedEmail && password === hardcodedPassword) {
        console.log("Logged in successfully");
        this.router.navigate(['/home']);
      } else {
        console.log("Invalid credentials");
      }
    }
  }

  startAutoslide(): void {
    // Ensure no existing interval is running before starting a new one
    if (this.interval) {
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      this.nextImage();
      // Trigger change detection manually
      this.cdRef.detectChanges();
    }, 2000); // Change images every 3 seconds
  }

  nextImage(): void {
    this.currentindex = (this.currentindex + 1) % this.images.length;
  }

  previousImage(): void {
    this.currentindex =
      (this.currentindex - 1 + this.images.length) % this.images.length; // Handle negative indices correctly
  }

  pauseSlide(): void {
    if (this.interval) {
      clearInterval(this.interval); // Pause the auto-slide
    }
  }

  resumeSlide(): void {
    this.startAutoslide(); // Resume the auto-slide
  }

  goToSlide(index: number): void {
    this.currentindex = index;
    this.startAutoslide(); // Restart auto-slide after jumping to a specific image
  }
}
