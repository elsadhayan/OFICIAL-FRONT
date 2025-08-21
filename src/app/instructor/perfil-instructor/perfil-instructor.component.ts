import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InstructorServicesServiceService } from '../../core/instructor-services-service.service';

@Component({
  selector: 'app-perfil-instructor',
  imports: [ReactiveFormsModule],
  templateUrl: './perfil-instructor.component.html',
  styleUrl: './perfil-instructor.component.css'
})
export class PerfilInstructorComponent  implements OnInit{
  perfilForm!: FormGroup;
  constructor(private fb: FormBuilder, private InstructorServiceService:InstructorServicesServiceService) {}
  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      curp: ['', Validators.required],
      contrasena: ['']
    });

    const usuario = JSON.parse(localStorage.getItem('usuario')!);
    this.perfilForm.patchValue({
      curp: usuario.curp
    });
  }

  actualizarPerfil() {
    const usuarioId = localStorage.getItem('usuario_id');

    if (!usuarioId) return;

    this.InstructorServiceService.actualizarPerfil(Number(usuarioId), this.perfilForm.value)
      .subscribe({
        next: (res) => alert('Perfil actualizado correctamente'),
        error: (err) => console.error('Error al actualizar perfil:', err)
      });
  }

}
