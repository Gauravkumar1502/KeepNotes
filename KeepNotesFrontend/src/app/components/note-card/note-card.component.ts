import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Note } from '../../models/note';
import { NoteFormDialogComponent } from '../note-form-dialog/note-form-dialog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [CardModule, FormsModule, ButtonModule, 
    CommonModule, NoteFormDialogComponent, RouterLink],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.css'
})
export class NoteCardComponent {
  @Input()
  note: Note = {
    id: '',
    title: '',
    content: '',
    createdAt: new Date(),
    updatedAt: new Date()
  };
  ngOnInit(): void {
    console.log(this.note.createdAt);
  }
}
