import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ButtonModule, IconFieldModule, 
    InputIconModule, InputTextModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isDarkTheme: boolean;
  filterTimeout: any;
  constructor(private themeService: ThemeService, private filterService: FilterService) {
    this.isDarkTheme = this.themeService.getSelectedTheme() === 'Dark';
  }
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.isDarkTheme ? this.themeService.setDarkTheme() : this.themeService.setLightTheme();
  }
  filterNotes(filterStr: string) {
    // debounce the filter event
    clearTimeout(this.filterTimeout);
    this.filterTimeout = setTimeout(() => {
      this.filterService.changeFilterValue(filterStr);
    }, 500);
  }
}
