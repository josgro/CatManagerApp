import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cat } from './cat';

@Injectable({
  providedIn: 'root'
})
export class CatService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'http://localhost:8080';

  public getCats(): Observable<Cat[]> {
    return this.http.get<Cat[]>(`${this.apiUrl}/cat/all`);
  }

  public addCat(cat: Cat): Observable<Cat> {
    return this.http.post<Cat>(`${this.apiUrl}/cat/add`, cat);
  }

  public updateCat(cat: Cat): Observable<Cat> {
    return this.http.put<Cat>(`${this.apiUrl}/cat/update`, cat);
  }

  public deleteCat(catId?: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cat/delete/${catId}`);
  }

}
