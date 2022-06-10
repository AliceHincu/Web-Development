import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../services/reservations.service';
import { Reservation } from './Reservation';

@Component({
  selector: 'app-browse-reservations',
  templateUrl: './browse-reservations.component.html',
  styleUrls: ['./browse-reservations.component.css']
})

export class BrowseReservationsComponent implements OnInit {
  columns: string[] = ["ID", "RoomID", "CheckIn", "CheckOut"];  // all columns of the table
  reservations: Reservation[] = []; 

  constructor(private service: ReservationsService) { }

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.service.fetchReservations()
    .subscribe(reservations => {if(reservations){this.reservations = reservations;}else{alert("There aren't any results");}});
  }

}
