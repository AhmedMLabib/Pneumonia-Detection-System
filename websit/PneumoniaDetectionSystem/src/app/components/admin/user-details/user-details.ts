import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-details',
  standalone: false,
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails {
  static_url = 'http://127.0.0.1:3000/media/uploads/';

  @Input() user: any;
  @Output() close = new EventEmitter<void>();
  onClose() {
    this.close.emit();
  }
}
