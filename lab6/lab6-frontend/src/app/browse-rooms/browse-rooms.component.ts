import { Component, OnInit } from '@angular/core';
import { FilterOption } from './FilterOptions';
import { Room } from './Room';
import { RoomsService } from '../services/rooms.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse-rooms',
  templateUrl: './browse-rooms.component.html',
  styleUrls: ['./browse-rooms.component.css']
})

export class BrowseRoomsComponent implements OnInit {
  /* ---- FIELDS ---- */
  columns: string[] = ["ID", "Capacity", "Type", "Hotel", "Price", "Reserve"];  // all columns of the table
  filterColumns: string[] = ["Capacity", "Type", "Hotel", "Price"];  // the columns needed for filtering
  filterOptions: FilterOption = {Capacity: [], Type: [], Hotel: [], Price: []};  // all available unique values for each column, to filter result
  
  // a form for filtering. each selector/input can receive a FormControl
  form = new FormGroup({
    Capacity: new FormControl('%', Validators.required),
    Type: new FormControl('%', Validators.required),
    Hotel: new FormControl('%', Validators.required),
    Price: new FormControl('>', Validators.required),
    PriceValue: new FormControl('0', Validators.required),
  });

  // array where we save all/filtered rooms 
  rooms: Room[] = []; 
  currentPage: number = 1;
  maxPage: number = 0;
  

  /* ---- INIT ---- */
  constructor(private service: RoomsService, private router: Router) { }

  ngOnInit(): void {
    this.getOptionsForFiltering();
    this.getRooms();
    this.getMaxPage();
  }

  /* ---- GETTERS ---- */
  getFormValues(){
    return {
      "Capacity": this.form.value.Capacity, 
      "Type": this.form.value.Type, 
      "Hotel": this.form.value.Hotel,
      "Price": this.form.value.Price,
      "Price-value": this.form.value.PriceValue,
      "Page": this.currentPage
    }
  }

  getMaxPage(){
    let formValues = Object.values(this.getFormValues());
    this.service.fetchMaxPage(...formValues)
    .subscribe(page => {this.maxPage = page; console.log("Here, ", page)}); 
  }

  getRooms(capacity="%", type="%", hotel="%", price=">", priceValue=0, page=1): void {
    let formValues = Object.values(this.getFormValues());
    this.service.fetchPageRooms(...formValues)
    .subscribe(rooms => {if(rooms){this.rooms = rooms;}else{alert("There aren't any results");}});
  }

  getOptionsForFiltering(): void{
    this.service.fetchFilterOptions()
    .subscribe(options => {this.filterOptions = options;});
  }

  get f(){
    return this.form.controls;
  }

  /* ---- VALIDATIONS ---- */
  validateAndFixPage(): number {
    console.log("Current page: ", this.currentPage);
    console.log("Max page: ", this.maxPage);
    if(this.currentPage > this.maxPage) {
        alert("There aren't any results");
        return -1;
    }

    if(this.currentPage <= 0) {
      alert("There aren't any results");
      return 1;
    }

    return 0;
  }


  /* ---- BUTTON STUFF ---- */
  submit(){
    this.currentPage = 1;
    let formValues = Object.values(this.getFormValues());
    this.getRooms(...formValues);
    this.getMaxPage();
    console.log("Current page: ", this.currentPage);
    console.log("Max page: ", this.maxPage);
  }

  next(){
    this.currentPage += 1;
    this.updateRoomsPage();
  }

  prev(){
    this.currentPage -= 1;
    this.updateRoomsPage();
  }

  updateRoomsPage(){
    let formValues = Object.values(this.getFormValues());
    let value = this.validateAndFixPage();

    if(value === 0) {
      this.getRooms(...formValues);
    } else {
      this.currentPage += value;
    }
  }

  reserveRoom(id: any){
    this.router.navigateByUrl('/add-reservation?roomId='+id);
  }

}
