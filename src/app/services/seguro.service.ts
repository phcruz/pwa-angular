import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Seguro } from './../models/Seguro';
import { OnlineOfflineService } from './online-offline.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class SeguroService {

  private db: any;

  constructor(
    private http: HttpClient,
    private readonly onlineOfflineService: OnlineOfflineService
  ) {
    this.registrarEventos(onlineOfflineService);
    this.criarDatabase();
  }

  private criarDatabase(): void {
    this.db = new Dexie('database');
    this.db.version(1).stores({
      seguros: 'placaCarro'
    });
  }

  private registrarEventos(onlineOfflineService: OnlineOfflineService): void {
    onlineOfflineService.trocaConexao.subscribe(online => {
      if (online) {
        console.log('enviando os itens do IndexedDb para a API');
        this.enviarItensdoIndexedDb();
      } else {
        console.log('Offline. Salvando no IndexedDb');
      }
    });
  }

  public salvar(seguro: Seguro): void {
    if (this.onlineOfflineService.isOnline) {
      this.salvarAPI(seguro);
    } else {
      this.salvarIndexedDb(seguro);
    }
  }

  private salvarAPI(seguro: Seguro): void {
    console.log('mandando pra API');
    this.http.post(environment.API + '/api/seguros', seguro)
      .subscribe(
      () => {
        alert('Seguro salvo com sucesso!');
      },
      err => console.error('Erro ao salvar seguro', err)
    );
  }

  private salvarIndexedDb(seguro: Seguro): void {
    this.db.seguros
      .add(seguro)
      .then(async () => {
        const todosSeguros: Seguro[] = await this.db.seguros.toArray();
        console.log('item salvo no IndexedDb', todosSeguros);
      })
      .catch(err => console.log('erro ao incluir item no IndexedDb', err));
  }

  private async enviarItensdoIndexedDb(): Promise<void> {
    const todosSeguros: Seguro[] = await this.db.seguros.toArray();
    console.log(todosSeguros);
    todosSeguros.forEach(async (item: Seguro) => {

      await this.salvarAPI(item);

      this.db.seguros.delete(item.placaCarro).then(() => {
        console.log(`seguro com a placa ${item.placaCarro} deletado do IndexedDb`);
      });
    });
  }

  public listar(): Observable<Seguro[]> {
    return this.http.get<Seguro[]>(environment.API + '/api/seguros');
  }
}
