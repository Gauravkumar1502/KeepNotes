import { Component, Output } from '@angular/core';
import { Note } from '../../models/note';
import { NotesService } from '../../services/notes.service';
import { NoteCardComponent } from "../note-card/note-card.component";

@Component({
    selector: 'app-notes',
    standalone: true,
    templateUrl: './notes.component.html',
    styleUrl: './notes.component.css',
    imports: [NoteCardComponent]
})
export class NotesComponent {
  notes: Note[] = [];
  
  constructor(private noteService: NotesService) {
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.noteService.getAll().subscribe({
      next: (notes) => {
        this.notes = notes;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
