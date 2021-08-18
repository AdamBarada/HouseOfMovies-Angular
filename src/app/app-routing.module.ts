import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { Error404Component } from "./client/error/error404/error404.component";
import { RoleGuard } from "./guards/role.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "admin",
    redirectTo: "admin/home",
    pathMatch: "full",
  },
  {
    path: "admin/home",
    loadChildren: () =>
      import("./admin/home/admin-home.module").then((m) => m.AdminHomeModule),
    canLoad: [RoleGuard],
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  },
  {
    path: "home",
    loadChildren: () =>
      import("./client/home/home.module").then((m) => m.HomeModule),
    canLoad: [RoleGuard],
  },
  {
    path: "screenings",
    loadChildren: () =>
      import("./client/screenings/screenings.module").then(
        (m) => m.ScreeningsModule
      ),
    canLoad: [RoleGuard],
  },
  {
    path: "admin/screenings",
    loadChildren: () =>
      import("./admin/screenings/admin-screenings.module").then(
        (m) => m.AdminScreeningsModule
      ),
    canLoad: [RoleGuard],
  },
  {
    path: "screenings/:id",
    loadChildren: () =>
      import(
        "./client/screenings/screening-detail/screening-detail.module"
      ).then((m) => m.ScreeningDetailModule),
    canLoad: [RoleGuard],
  },
  {
    path: "movies",
    loadChildren: () =>
      import("./client/movies/movies.module").then((m) => m.MoviesModule),
    canLoad: [RoleGuard],
  },
  {
    path: "admin/movies",
    loadChildren: () =>
      import("./admin/movies/admin-movies.module").then((m) => m.MoviesModule),
    canLoad: [RoleGuard],
  },
  {
    path: "reservations",
    loadChildren: () =>
      import("./client/reservations/reservations.module").then(
        (m) => m.ReservationsModule
      ),
    canLoad: [RoleGuard],
  },
  {
    path: "error",
    loadChildren: () =>
      import("./client/error/error.module").then((m) => m.ErrorModule),
  },

  { path: "**", component: Error404Component },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: "reload",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
