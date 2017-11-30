import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}
  title = 'app';
  ngOnInit(){
    this.userService.onAuthStateChanged().then((user)=>{
      this.userService.setAuth(user)
    })
  }
}
