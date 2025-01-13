import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit ,OnDestroy {

  images: string[] = [
    'assets/thumbnail_image1.png',
    'assets/thumbnail_image2.png',
    'assets/thumbnail_image3.png'
  ]
  currentindex: number = 0;
  interval: any;
  loginForm: FormGroup;


  constructor(private fb : FormBuilder , private router : Router) { 
    this.loginForm = this.fb.group({
      email:["",[ Validators.required ,Validators.email]],
      password:["",[Validators.required,Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
    this.startAutoslide();
  }

  ngOnDestroy(): void {
    if(this.interval){
      clearInterval(this.interval)
    }
  }

  onSubmit():void{
   
    if(this.loginForm.valid){
      const{email,password} = this.loginForm.value;

      const hardcodedEmail = 'admin@gmail.com';
      const hardcodedPassword ='admin123';
     if(email ===hardcodedEmail && password === hardcodedPassword) {
      alert('login succesfull');
      this.router.navigate(['/home']);
     }else{
      alert('Invalid credentials')
     }
    }
}

  startAutoslide(): void{
    this.interval = setInterval(() =>{
      this.nextImage();
    } , 2000)

  }

  nextImage():void{
    this.currentindex = (this.currentindex + 1) % this.images.length;

  }

  previousImage():void {
    this.currentindex =(this.currentindex -1)% this.images.length;

  }

  pauseSlide(): void {
    clearInterval(this.interval); // Pause auto-slide
  }
  
  resumeSlide(): void {
    this.startAutoslide(); // Resume auto-slide
  }

  goToSlide(index : number):void{
    this.currentindex = index;
    clearInterval(this.interval);
    this.startAutoslide();
  }

}
