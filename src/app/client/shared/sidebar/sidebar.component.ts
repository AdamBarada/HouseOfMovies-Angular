import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import {
  faFilm,
  faHome,
  faSignOutAlt,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.sass"],
})
export class SidebarComponent implements OnInit {
  faHome = faHome;
  faFilm = faFilm;
  faVideo = faVideo;
  faSignOutAlt = faSignOutAlt;

  @Output() checked = new EventEmitter<boolean>();
  isChecked = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  setChecked() {
    this.isChecked = !this.isChecked;
    this.checked.emit(this.isChecked);
  }

  onAuth() {
    this.authService.setToken("");
    localStorage.removeItem("token");
    this.router.navigateByUrl("/auth/login");
  }
}
