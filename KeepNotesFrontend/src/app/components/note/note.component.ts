import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

interface Note{
  id: string;
  header: string;
  content: string;
  createdAT: Date;
  updatedAt: Date;
}

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CardModule, FormsModule, ButtonModule, CommonModule],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  @Input()
  note: Note = {
    id: '',
    header: '',
    content: '',
    createdAT: new Date(),
    updatedAt: new Date()
  };
}
