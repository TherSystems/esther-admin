import { Component, OnInit } from '@angular/core';
import { AuthTokenService } from '../../core/services/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public conexion: string = ''; //Variable
  public controller: string = 'oracle8:jdbc8:OracleDriver'; //Variable
  public listaConexiones = [
    { cadena: 'Conexion 1', servicio: 'Esparta' },
    { cadena: 'Conexion 2', servicio: 'SIC' },
    { cadena: 'Conexion 3', servicio: 'SAC' },
  ];
  constructor(private _tokenService: AuthTokenService) {}
  ngOnInit(): void {
    console.log(this._tokenService.getUser());
  }
  enviar(): void {
    console.log('Enviado a conexion', this.conexion);
  }
}
