import { Component, OnInit } from '@angular/core';
import {faArrowRight} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.sass']
})
export class Error404Component implements OnInit {
  faArrowRight = faArrowRight;
  showNav = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log(this.authService.isAdmin)
    if (!this.authService.isAdmin) this.showNav = true;
    if (localStorage.getItem("isAdmin") == "false") this.showNav = true;
  }

}
