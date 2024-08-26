import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  informacoes: {
    nome: string;
    cidade: string;
    estado: string;
  }[] = [];

  onSubmit() {
    this.informacoes.push({
      nome: this.nome,
      cidade: this.cidade,
      estado: this.estado,
    });
    this.nome = '';
    this.cidade = '';
    this.estado = '';
  }
}
