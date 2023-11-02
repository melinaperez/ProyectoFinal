import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Output()
  toggleSidebar = new EventEmitter();

  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout();
  }
}
