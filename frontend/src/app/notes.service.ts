import { Injectable } from '@angular/core';
import { NoteInterface } from './note-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})

export class NotesService {
  apiUrl: string = 'http://localhost:9000/notes'

  constructor(private http: HttpClient, private router: Router) { }

  async showAlert(message: string): Promise<void> {
    return new Promise((resolve) => {
      alert(message);
      resolve(); 
    });
  }

  async getAllNotes(): Promise<NoteInterface[]> {
    const token = localStorage.getItem('loginToken');
    const data = await fetch(`${this.apiUrl}/getAllNotes`, {method: 'GET', headers: {'Content-Type': 'application/json', 'Authorization': `${token}`}});
    console.log(data);
    return await data.json() ?? [];
  }


  async getNoteById( _id : string): Promise<NoteInterface> {
    const data = await fetch(`${this.apiUrl}/getNote/${_id}`);
    return await data.json() ?? [];

  }  

  async createNote(title: string, category: string, isMarkdown: boolean, privacyMode: number, authList: string[]) {
    const token = localStorage.getItem('loginToken');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': `${token}`
    });

    try{
      this.http.post<{message?: string, error?:string}>(
        `${this.apiUrl}/createNote`,
        {title, category, isMarkdown, privacyMode, authList},
        {headers}).subscribe({

          next: (res) => {
            if(res.message==='Note created successfully.'){
              alert('Note created successfully.');
            }
            else{
              alert(res.error || "asa");
            }
          }
      })
      
    }catch(error){
      alert("Request error.")
    }


    
  }

  async deleteNote(id: string){
    const token = localStorage.getItem('loginToken');
    const body = { id };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${token}`});

    this.http.delete<{message?: string, error?:string}>(`${this.apiUrl}/deleteNote`,
      {headers, body}).subscribe({
      next: (res) => {
        if(res.message==="Note deleted."){
          this.router.navigateByUrl('/notes');
        }
        else{
          alert(res.error || "Request error.");
        }

        return
      },

      error: (err) => {
        console.error('Note deletion failed:', err);
        alert('Note deletion failed: ' + (err.error?.message || 'Unknown error'));
      }
    })
  }

  async duplicateNote(id: string){
    const token = localStorage.getItem('loginToken');
    const body = { id };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${token}`});

    console.log(token);
    this.http.post<{message?: string, error?:string}>(`${this.apiUrl}/duplicateNote`,
      body,
      {headers}).subscribe({
        next: (res) => {
          if (res.message === "Note duplicated successfully.") {
            this.router.navigateByUrl('/notes');
          }
          else{
            alert(res.error || "Request error.");
          }
      },
      error: (err) => {
          alert('Note duplication failed: ' + (err.error?.error || 'Unknown error')); 
      }
    }) 
    

  }

  async updateNote(id: string, noteBody: string){
    const token = localStorage.getItem('loginToken');
    const body = { id, noteBody };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `${token}`});

    this.http.patch<{message?: string, error?:string}>(`${this.apiUrl}/updateNoteBody`,
      body,
      {headers}).subscribe({
        next: async (res) => {
          if (res.message === "Note updated successfully.") {
            this.router.navigateByUrl('/notes');
          }
          else{
            alert(res.error || "Update request error.");
          }
      },
      error: (err) => {
          alert('Note update failed: ' + (err.error?.error || 'Unknown error')); 
      }
    }) 
  }


  





}


