import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { Favorites } from './favorites';

describe('Favorites', () => {
  let component: Favorites;
  let fixture: ComponentFixture<Favorites>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Favorites],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Favorites);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    TestBed.inject(HttpTestingController)
      .expectOne('http://localhost:3000/favorites')
      .flush([]);

    expect(component).toBeTruthy();
  });
});
