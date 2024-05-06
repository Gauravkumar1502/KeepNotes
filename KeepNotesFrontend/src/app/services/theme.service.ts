import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(@Inject(DOCUMENT) private document: Document) {
    if(this.getThemeFromLocalStorage() === null){
      this.setThemeToLocalStorage(this.getPreferredTheme());
    }
    this.getThemeFromLocalStorage() === 'lara-dark-blue.css' ? this.setDarkTheme() : this.setLightTheme();
  }

  private setTheme(theme: string) {
    let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
    if (themeLink)
        themeLink.href = theme;
  }

  getSelectedTheme() {
    return this.getThemeFromLocalStorage() === 'lara-dark-blue.css' ? 'Dark' : 'Light';
  }
  
  setLightTheme() {
    this.setTheme('lara-light-blue.css');
    this.setThemeToLocalStorage('lara-light-blue.css');
  }

  setDarkTheme() {
    this.setTheme('lara-dark-blue.css');
    this.setThemeToLocalStorage('lara-dark-blue.css');
  }

  getPreferredTheme() {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'lara-dark-blue.css';
    }
    return 'lara-light-blue.css';
  }

  getThemeFromLocalStorage() {
    return localStorage.getItem('theme');
  }

  setThemeToLocalStorage(theme: string) {
    localStorage.setItem('theme', theme);
  }

  removeThemeFromLocalStorage() {
    localStorage.removeItem('theme');
  }
}
