import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private router: Router, private userService: UserService) {

  }
  signOut(event) {
    event.preventDefault();
    this.userService.logOut().then(
      ()=>{
        this.userService.setAuth(null);
        this.router.navigateByUrl('/');
      }
    );
  }
}
