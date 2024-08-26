import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.scss',
})
export class FormularioComponent {
  nome: string = '';
  cidade: string = '';
  estado: string = '';

  constructor(private localStorageService: LocalStorageService) {}

  informacoes: {
    nome: string;
    cidade: string;
    estado: string;
  }[] = [];

  onSubmit() {
    const info = {
      nome: this.nome,
      cidade: this.cidade,
      estado: this.estado,
    };

    this.informacoes.push(info);
    this.localStorageService.setItem('informacoes', this.informacoes);

    this.nome = '';
    this.cidade = '';
    this.estado = '';
  }

  ngOnInit() {
    const storedInfo = this.localStorageService.getItem('informacoes');
    if (storedInfo) {
      this.informacoes = storedInfo;
    }
  }

  excluirItem(index: number) {
    this.informacoes.splice(index, 1);
    this.localStorageService.setItem('informacoes', this.informacoes);
  }
}
