import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

describe('HttpClient', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpClient = TestBed.get(HttpClient);
    expect(service).toBeTruthy();
  });
});
