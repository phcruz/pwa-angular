import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnlineOfflineService {

  private trocaConexao$ = new Subject<boolean>();

  constructor() {
    window.addEventListener('online', () => this.atualizaStatusConexao());
    window.addEventListener('offline', () => this.atualizaStatusConexao());
  }

  get isOnline(): boolean {
    return !!window.navigator.onLine;
  }

  get trocaConexao(): Observable<boolean> {
    return this.trocaConexao$.asObservable();
  }

  public atualizaStatusConexao(): void {
    this.trocaConexao$.next(window.navigator.onLine);
  }
}
