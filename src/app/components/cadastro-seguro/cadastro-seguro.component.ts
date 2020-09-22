import { PushNotificationService } from './../../services/push-notification.service';
import { SeguroService } from './../../services/seguro.service';
import { CarroService } from './../../services/carro.service';
import { MarcaCarroService } from './../../services/marca-carro.service';
import { MarcaCarro } from './../../models/MarcaCarro';
import { Seguro } from './../../models/Seguro';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cadastro-seguro',
  templateUrl: './cadastro-seguro.component.html',
  styleUrls: ['./cadastro-seguro.component.css']
})
export class CadastroSeguroComponent implements OnInit {

  public marcasCarro$: Observable<MarcaCarro[]>;
  public seguro = new Seguro();

  constructor(
    private carroService: CarroService,
    private seguroService: SeguroService,
    private pushNotificationService: PushNotificationService
  ) { }

  ngOnInit() {
    this.carregarMarcasDeCarro();
  }

  public carregarMarcasDeCarro(): void {
    this.marcasCarro$ = this.carroService.getMarcas();
  }

  public adicionar(): void {
    this.seguro.id = this.seguro.placaCarro;
    this.seguroService.salvar(this.seguro);
  }

  public enviarNotificacao(): void {
    this.pushNotificationService.enviar();
  }

}
