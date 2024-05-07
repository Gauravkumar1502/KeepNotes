import { Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { NotesComponent } from './components/notes/notes.component';
import { NoteComponent } from './components/note/note.component';
import { EditNoteComponent } from './components/edit-note/edit-note.component';

export const routes: Routes = [
    { path: '', redirectTo: 'notes', pathMatch: 'full' },
    {
        path: 'notes',
        component: NotesComponent,
        title: 'Notes',
    },
    { path: 'note/new', component: EditNoteComponent, title: 'Add Note' },
    { path: 'note/:id', component: NoteComponent, title: 'Note' },
    { path: 'edit/:id', component: EditNoteComponent, title: 'Edit Note' },
    { path: '**', component: PageNotFoundComponent, title: 'Oops!' }
];
