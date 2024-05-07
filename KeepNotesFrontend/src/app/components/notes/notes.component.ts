import { Component } from '@angular/core';
import { Note } from '../../models/note';
import { NotesService } from '../../services/notes.service';
import { NoteCardComponent } from "../note-card/note-card.component";
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { FilterService } from '../../services/filter.service';

@Component({
    selector: 'app-notes',
    standalone: true,
    templateUrl: './notes.component.html',
    styleUrl: './notes.component.css',
    imports: [NoteCardComponent, ButtonModule, RouterLink]
})
export class NotesComponent {
  notes: Note[] = [];
  filterValue: string = '';
  filteredNotes: Note[] = [];
  
  constructor(private noteService: NotesService, private filterService: FilterService) {
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.noteService.getAll().subscribe({
      next: (notes) => {
        this.notes = notes;
        this.filteredNotes = this.notes;
      },
      error: (err) => {
        console.log(err);
      }
    });

    // subscribe to filter service
    this.filterService.currentFilterValue.subscribe(filterValue => {
      this.filterValue = filterValue;
      // filter notes
      this.filteredNotes = this.notes.filter(n => {
        return n.title.includes(this.filterValue) ||
              n.content.includes(this.filterValue);
      });
    });
  }
}
