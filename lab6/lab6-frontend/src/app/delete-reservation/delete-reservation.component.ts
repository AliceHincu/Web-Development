import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../services/reservations.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-reservation',
  templateUrl: './delete-reservation.component.html',
  styleUrls: ['./delete-reservation.component.css']
})
export class DeleteReservationComponent implements OnInit {
  reservationID: number = 0;
  reservationsId: number[] = [] ;
  deleteResponse: string = "";
  closeResult: string = ""; 

  constructor(private service: ReservationsService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getReservationsId();
  }

  open(content: any) {  
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {  
      this.closeResult = `Closed with: ${result}`;  
      if (result === 'yes') {  
        this.onDelete();  
      }  
    }, (reason) => {  
      this.closeResult = `Dismissed `;  
    });  
  }  
  

  onDelete(): void{
    
    this.service.deleteRequest(this.reservationID)
      .subscribe(
        data => {this.deleteResponse = `${data}`; this.getReservationsId();},
        error => this.deleteResponse = `Delete failed: ${error}`
      )
  }

  getReservationsId(){
    this.reservationsId = [];
    this.service.fetchReservations()
      .subscribe(reservations => {
        if(reservations){
          for(let r of reservations){
            this.reservationsId.push(r.ID);
          }
          this.reservationID = Number(this.reservationsId[0]);
        } else {
          alert("There aren't any results");
        }});
  }
}
