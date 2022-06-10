import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { BrowseReservationsComponent } from './browse-reservations/browse-reservations.component';
import { BrowseRoomsComponent } from './browse-rooms/browse-rooms.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DeleteReservationComponent } from './delete-reservation/delete-reservation.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'browse-rooms', component: BrowseRoomsComponent},
  {path: 'browse-reservations', component: BrowseReservationsComponent},
  {path: 'add-reservation', component: AddReservationComponent},
  {path: 'delete-reservation', component: DeleteReservationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
