import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  CanLoad,
  Route,
  UrlSegment,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class RoleGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // if not authenticated

    let token = this.authService.token
      ? this.authService.token
      : localStorage.getItem("token");

    let admin: boolean = this.authService.isAdmin
      ? this.authService.isAdmin
      : localStorage.getItem("isAdmin") === "true"
      ? true
      : false;

    if (!token && route.path?.includes("admin")) {
      this.router.navigateByUrl("/error/accessDenied");
      return false;
    }

    // if user role

    if (token != null && !admin && route.path?.includes("admin")) {
      this.router.navigateByUrl("/error/accessDenied");
      return false;
    }

    // if admin role

    if (token != null && admin && !route.path?.includes("admin")) {
      this.router.navigateByUrl("/error/accessDenied");
      return false;
    }

    return true;
  }
}
