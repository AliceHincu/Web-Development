import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ReservationsService } from '../services/reservations.service';
import { of, map, switchMap } from 'rxjs';
import { Reservation } from '../browse-reservations/Reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})

export class AddReservationComponent implements OnInit {
  reservationModel = new Reservation(0, 0, this.getTodayDate(), this.getTomorrowDate());
  addResponse: string = "";

  reservations: Reservation[] = [];
  availableRoomsId: number[] = [];
  reservedIntervals = {};
  currentUrl = "";
  currentId = 0;

  // a form for filtering. each selector/input can receive a FormControl
  form = new FormGroup({
    CheckIn: new FormControl(this.getTodayDate(), Validators.required),
    CheckOut: new FormControl(this.getTomorrowDate(), Validators.required),
  });

  constructor(private service: ReservationsService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
        //consolo
        this.currentId = params['roomId'];
        console.log("My room: ", this.currentId);
        this.form.setValue({
            CheckIn: this.getTodayDate(),
            CheckOut: this.getTomorrowDate()
        }); 
    });
   }

  ngOnInit(): void {
    this.currentUrl = this.router.url;
    
    // alert(this.validate().subscribe(() => {

    // }));
    //this.getAvailableRoomIds();
  }

  setDefaultValuesForm(){
    //reservationForm
  }

  updateDate(){

  }

  onAdd(): void{
    this.validate().subscribe((response) => {
      if(response){
        this.service.addRequest(this.reservationModel)
        .subscribe(
          data => {this.addResponse = `${data}`;},
          error => this.addResponse = `Add failed: ${error}`
        );
      } else {
        alert("Incorrect dates! There is some overlapping");
      }
    })
  }

  /* ---- GETTERS ---- */
  getFormValues() {
    return {
      "CheckIn": this.reservationModel.CheckIn, 
      "CheckOut": this.reservationModel.CheckOut,
    }
  }

  get f() {
    return this.form.controls;
  }

  getAvailableRoomIds() {
    this.service.fetchReservationsAndRoomIds()
    .subscribe(array => {
      if(array){
        this.availableRoomsId = this.getAvailableIds(array); 
        if(this.availableRoomsId){   
          this.reservationModel.RoomID = Number(this.availableRoomsId[0]);
        } else {
          alert("There are no room for your selected dates");
        }
      } else {
        alert("There aren't any results");
      }});
  }

  
  getAvailableIds(array: any): number[] {
    let formValues = this.getFormValues();
    
    let from = new Date(formValues.CheckIn);
    let to = new Date(formValues.CheckOut);

    if(array){
      // 1. check overlapping intervals with with other customers
      let unavailableRoomIds = this.getUnavailableRoomsIds(from, to, array["reservations"]);
      //console.log(unavailableRoomIds);
      // 2. get only the ids of the available rooms
      let availableRoomIds = this.getAvailableRoomsIds(array["roomIds"], unavailableRoomIds);
      //console.log(availableRoomIds);
      
      return availableRoomIds;
    }

    return [];
  }

  getAvailableRoomsIds(allIds:number[], unavailableIds: number[]): number[]{
    let availableRoomIds: number[] = [];

    for(let id of allIds){
      if(!(unavailableIds.includes(id)) && !(availableRoomIds.includes(id))){
        availableRoomIds.push(id);
      }
    }

    return availableRoomIds;
  }
  
  getUnavailableRoomsIds(from: Date, to: Date, reservations:Reservation[]): number[]{
    let unavailableRoomIds = [];

    for(let r of reservations){
      let checkin = new Date(r["CheckIn"]);
      let checkout = new Date(r["CheckOut"]);
      if(this.isCheckinInInterval(from, checkin, checkout) || this.isCheckoutInInterval(to, checkin, checkout) || this.isCheckinInInterval(checkin, from, to) || this.isCheckoutInInterval(checkout, from, to)){
        unavailableRoomIds.push(r.RoomID);
      }
    }

    return unavailableRoomIds;
  }
  

  getTodayDate(){
    const today =  new Date();
    const day = today && today.getDate() || -1;
    const dayWithZero = day.toString().length > 1 ? day : '0' + day;
    const month = today && today.getMonth() + 1 || -1;
    const monthWithZero = month.toString().length > 1 ? month : '0' + month;
    const year = today && today.getFullYear() || -1;

    return `${year}-${monthWithZero}-${dayWithZero}`;
}

  getTomorrowDate(){
      const today =  new Date();
      const tomorrow =  new Date(today.setDate(today.getDate() + 1));

      const day = tomorrow && tomorrow.getDate() || -1;
      const dayWithZero = day.toString().length > 1 ? day : '0' + day;
      const month = tomorrow && tomorrow.getMonth() + 1 || -1;
      const monthWithZero = month.toString().length > 1 ? month : '0' + month;
      const year = tomorrow && tomorrow.getFullYear() || -1;

      return `${year}-${monthWithZero}-${dayWithZero}`;
  }

  /* ---- BUTTONS ---- */
  submit(){
    let formValues = Object.values(this.getFormValues());
    
    let from = formValues[1];
    let to = formValues[2];
    let roomID = formValues[0];

    if(roomID) {
      //this.service.postNewReservation(roomID, from, to);
      console.log(this.reservationModel);
    } else {
      alert("No room chosen");
    }
  }

  /* ---- VALIDATIONS ---- */
  validate(){
    let formValues = this.getFormValues();
    
    let from = new Date(formValues.CheckIn);
    let to = new Date(formValues.CheckOut);
    let roomID = this.currentId;

    if(from>=to){
        alert("Incorrect dates! Check-out date is before check-in date");
        return of(false);
    }

    let today = new Date(this.getTodayDate());
    if(today > from){
        alert("You can't reserve dates before today");
        return of(false);
    }

    // return this.service.fetchReservationsAndRoomIds()
    // .subscribe(array => {
    //   if(array){
    //     this.availableRoomsId = this.getAvailableIds(array);
    //     console.log(this.availableRoomsId, roomID);
        
    //     if(this.availableRoomsId.includes(roomID)){  
    //         return true;
    //     }
    //     return false; 
    //   } else {
    //     alert("There aren't any results");
    //     return false;
    // }}); 

    return this.service.fetchReservationsAndRoomIds()
    .pipe(
      map((array: any) => {
        if(array){
          this.availableRoomsId = this.getAvailableIds(array);
          console.log(this.availableRoomsId, roomID);
          
          if(this.availableRoomsId.includes(roomID)){  
              return true;
          }
          return false; 
        } else {
          alert("There aren't any results");
          return false;
        }
      })
    );

/*
    let reservedDates = getReservedIntervals(roomID);
    if(reservedDates){
        for(let date of reservedDates){
            if(isCheckinInInterval(from, date[0], date[1]) || isCheckoutInInterval(to, date[0], date[1])){
                alert("Incorrect dates! Interval or part of interval is already reserved!");
                return false;
            }
        }
    }*/

  }
  isCheckinInInterval(myDate: Date, intervalDateLeft: Date, intervalDateRight: Date) {
    if(intervalDateLeft <= myDate && myDate < intervalDateRight)  // you can check-in when others check-out
        return true;
    return false;
  }

  isCheckoutInInterval(myDate: Date, intervalDateLeft: Date, intervalDateRight: Date) {
      if(intervalDateLeft < myDate && myDate <= intervalDateRight)  // you can check-out when others check-in
          return true;
      return false;
  }
}
