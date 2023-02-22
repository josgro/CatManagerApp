import { Component, OnInit } from '@angular/core';
import { Cat } from './cat';
import { CatService } from './cat.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public cats: Cat[] = [];
  public editCat: Cat | undefined;
  public deleteCat: Cat | undefined;

  subscriptions: Subscription = new Subscription();

  constructor(private catService: CatService) { }

  ngOnInit(): void {
    this.getCats();

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  public getCats(): void {
    this.subscriptions.add(this.catService.getCats().subscribe({
      next: (cats: Cat[]) => {
        this.cats = cats;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
      complete: () => {
        // console.info('API call complete');
      }
    }));
  }

  public onAddCat(addForm: NgForm): void {
    document.getElementById('add-cat-form')?.click();
    this.subscriptions.add(this.catService.addCat(addForm.value).subscribe({
      next: (response: Cat) => {
        console.log(response);
        this.getCats();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        addForm.reset();
      },
      complete: () => {
        // console.info('API call complete');
      }
    }));
  }

  public onUpdateCat(cat: Cat): void {
    this.subscriptions.add(this.catService.updateCat(cat).subscribe({
      next: (response: Cat) => {
        console.log(response);
        this.getCats();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
      complete: () => {
        // console.info('API call complete');
      }
    }));
  }

  public onDeleteCat(id?: number): void {
    this.subscriptions.add(this.catService.deleteCat(id).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getCats();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
      },
      complete: () => {
        // console.info('API call complete');
      }
    }));
  }

  public onOpenModal(mode: string, cat?: Cat): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-bs-target', '#addCatModal');
      button.setAttribute('data-bs-toggle', 'modal');
    }
    if (mode === 'edit') {
      this.editCat = cat;
      button.setAttribute('data-bs-target', '#updateCatModal');
      button.setAttribute('data-bs-toggle', 'modal');
    }
    if (mode === 'delete') {
      this.deleteCat = cat;
      button.setAttribute('data-bs-target', '#deleteCatModal');
      button.setAttribute('data-bs-toggle', 'modal');
    }
    container?.appendChild(button);
    button.click();
  }
}
