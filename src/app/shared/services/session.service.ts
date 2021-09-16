import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private readonly storage: Storage = sessionStorage;

  public getSession(key: string): string {
    return this.storage.getItem(key) as string;
  }

  public setSession(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  public removeSession(key: string): void {
    this.storage.removeItem(key);
  }
}
