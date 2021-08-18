import { Component, HostListener, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  faBars,
  faSearch,
  faLongArrowAltRight,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {
  faBars = faBars;
  faSearch = faSearch;
  faLongArrowAltRight = faLongArrowAltRight;
  isOpaque = false;
  isChecked = false;
  isAuth = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.token || localStorage.getItem('token')) {
      this.isAuth = true;
    }
  }

  @HostListener('document:scroll', ['$event'])
  onWindowScroll(e: any) {
    let element = document.querySelector('nav');
    if (element) {
      if (window.pageYOffset > element.clientHeight || this.isChecked) {
        this.isOpaque = true;
      } else {
        this.isOpaque = false;
      }
    }
  }

  onAuth() {
    if (this.isAuth) {
      this.authService.setToken('');
      localStorage.removeItem('token');
    }
    this.router.navigateByUrl('/auth/login');
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }

  onSubmit(f:NgForm){
      console.log(f.form.value.search);
      this.router.navigate(['/movies'], {queryParams: {search: f.form.value.search}});
      f.reset();
  }

  setChecked(event: any) {
    if (event.target.checked) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }
    let e;
    this.onWindowScroll(e);
  }
}
