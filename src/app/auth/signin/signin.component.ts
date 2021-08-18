import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.sass"],
})
export class SigninComponent implements OnInit {
  faEnvelope = faEnvelope;
  faLock = faLock;
  isOpen: boolean = false;
  isChecked: boolean = false;

  constructor(
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(f: NgForm) {
    this.spinner.show(undefined, {
      color: "#4562F2",
    });
    this.authService.login(f.form.value.email, f.form.value.password).subscribe(
      (resData) => {
        if (this.isChecked) {
          localStorage.setItem("token", resData.token);
          localStorage.setItem("isAdmin", resData.admin);
        }
        this.authService.setToken(resData.token);
        this.authService.setStatus(!!resData.admin);
        f.reset();
        this.spinner.hide();
        if (resData.admin){
          this.router.navigateByUrl("/admin/home");
        }
        else this.router.navigateByUrl("/home");
      },
      () => {
        f.reset();
        this.spinner.hide();
        this.toast.error(
          "Please try another email or password",
          "Invalid Credentials",
          {
            progressBar: true,
          }
        );
      }
    );
  }

  setChecked(event: any) {
    if (event.target.checked) {
      this.isChecked = true;
    }
  }
}
