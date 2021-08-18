import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.sass"],
})
export class SignupComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;
  isOpen: boolean = false;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    this.spinner.show(undefined, {
      color: "#4562F2",
    });
    this.authService
      .signup(
        f.form.value.firstName,
        f.form.value.lastName,
        f.form.value.email,
        f.form.value.password
      )
      .subscribe(
        () => {
          this.authService
            .login(f.form.value.email, f.form.value.password)
            .subscribe((resData) => {
              localStorage.setItem("token", resData.token);
              localStorage.setItem("isAdmin", resData.admin);
              this.authService.setToken(resData.token);
              this.authService.setStatus(!!resData.admin);
              f.reset();
              this.spinner.hide();
              if (resData.admin) this.router.navigateByUrl("/admin/home");
              else this.router.navigateByUrl("/home");
            });
          f.reset();
          this.spinner.hide();
        },
        (errRes) => {
          this.spinner.hide();
          this.toastr.error(
            "Do you want to sign in instead?",
            "Email already in use",
            {
              progressBar: true,
            }
          );
        }
      );
  }
}
