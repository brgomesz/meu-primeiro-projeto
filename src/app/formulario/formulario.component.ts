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

  show: boolean = false;

  showFormulario() {
    this.show = true;
    console.log('Status da variavel', this.show);
  }

  closeFormulario() {
    this.show = false;
  }

  constructor(private localStorageService: LocalStorageService) {}

  informacoes: {
    nome: string;
    cidade: string;
    estado: string;
  }[] = [];
  editIndex: number | null = null;

  onSubmit() {
    if (this.editIndex !== null) {
      this.informacoes[this.editIndex] = {
        nome: this.nome,
        cidade: this.cidade,
        estado: this.estado,
      };
      this.editIndex = null;
    } else {
      const info = {
        nome: this.nome,
        cidade: this.cidade,
        estado: this.estado,
      };
      this.informacoes.push(info);
    }

    this.localStorageService.setItem('informacoes', this.informacoes);

    // Limpar os campos do formulário após salvar
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
  editarItem(index: number) {
    const info = this.informacoes[index];
    this.nome = info.nome;
    this.cidade = info.cidade;
    this.estado = info.estado;
    this.editIndex = index;
  }
}
