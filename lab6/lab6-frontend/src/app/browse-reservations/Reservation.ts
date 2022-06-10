export class Reservation {
    constructor(
      public ID : number,
      public RoomID: number,
      public CheckIn: string,
      public CheckOut: string
    ) {}
}