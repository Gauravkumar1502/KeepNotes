import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NoteComponent } from './components/note/note.component';


interface Note{
  id: string;
  header: string;
  content: string;
  createdAT: Date;
  updatedAt: Date;
}

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, NoteComponent]
})
export class AppComponent {
  title = 'KeepNotesFrontend';

  notes: Note[] = [
    {
      id: '1',
      header: 'Note 1',
      content: 'This is the first note',
      // random created and updated date
      createdAT: new Date(1995, 11, 17),
      updatedAt: new Date(1995, 11, 18)
    },
    {
      id: '2',
      header: 'Note 2',
      content: 'lorem ipsum dolor sit amet conseasdsadasd adaasdsadasdsadasasdasdsadsadadsdadasdadadaadsadadd asasdadaaaasdctetur adipiscing elit',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      header: 'Note 3',
      content: 'This is the third note',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '4',
      header: 'Note 4',
      content: 'This is the fourth note',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '5',
      header: 'Note 5',
      content: 'This is the fifth note',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '6',
      header: 'Note 6',
      content: 'This is the sixth note',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '7',
      header: 'Note 7',
      content: 'This is the seventh note',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '8',
      header: 'Note 8',
      content: 'This is the eighth note',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '9',
      header: 'Note 9',
      content: 'This is the ninth note',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '10',
      header: 'Note 10',
      content: 'This is the tenth note',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '11',
      header: 'Note 11',
      content: 'This is the eleventh note',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '12',
      header: 'Note 12',
      content: 'This is the twelfth note',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '13',
      header: 'Note 13',
      content: 'This is the thirteenth note',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '14',
      header: 'Note 14',
      content: 'This is the fourteenth note',
      createdAT: new Date(),
      updatedAt: new Date()
    },
    {
      id: '15',
      header: 'Note 15',
      content: 'This is the fifteenth note',
      createdAT: new Date(),
      updatedAt: new Date()
    }
  ];
}