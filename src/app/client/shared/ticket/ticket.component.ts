import { Component, Input, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.sass'],
})
export class TicketComponent implements OnInit {
  code =
    '11010010000100111011001011101111011010001110101110011001101110010010111101110111001011001001000011011000111010110001001110111101101001011010111000101101';

  @Input()
  reservation: Reservation | undefined;

  constructor() {}

  ngOnInit(): void {}
}
