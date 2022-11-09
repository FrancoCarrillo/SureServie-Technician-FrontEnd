export class ServiceRequestUpdate{
  total_price: number;
  reservation_price: number;
  confirmation: number;

  constructor(total_price: number, reservation_price: number, confirmation: number) {
    this.total_price = total_price;
    this.reservation_price = reservation_price;
    this.confirmation = confirmation;
  }
}
