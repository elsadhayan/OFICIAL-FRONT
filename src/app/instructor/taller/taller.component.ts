import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HorarioService } from '../../services/horarios.service';
import { InstructorServicesServiceService } from '../../core/instructor-services-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taller',
  imports: [CommonModule,FormsModule],
  templateUrl: './taller.component.html',
  styleUrl: './taller.component.css'
})
export class TallerComponent implements OnInit {
   maestroId: number = 0;
  tallerId: number = 0;
  nombreTaller: string = '';
  datosInstructor: any = null;

  // Estado del componente
  editando: boolean = false;
  guardando: boolean = false;
  cargandoDatos: boolean = true;
  horarioMatrix: string[][] = [];
  horarioOriginal: string[][] = [];
  mensaje: { texto: string, tipo: 'success' | 'error' | 'warning' } | null = null;

  // Configuración de horarios
  diasSemana: string[] = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes'];
  horasDisponibles: string[] = ['5:00 - 6:00', '6:00 - 7:00', '7:00 - 8:00'];
  horasConfig = [
    { inicio: '17:00', fin: '18:00' },
    { inicio: '18:00', fin: '19:00' },
    { inicio: '19:00', fin: '20:00' }
  ];

  constructor(
    private HorarioService:HorarioService,
    private InstructorServiceService: InstructorServicesServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerDatosAutenticacion();
  }

  /**
   * Obtiene los datos del maestro logueado desde localStorage
   */
  obtenerDatosAutenticacion(): void {
    try {
      // Obtener datos del usuario logueado
      const usuarioJson = localStorage.getItem('usuario');
      const usuarioId = localStorage.getItem('usuario_id');

      if (!usuarioJson || !usuarioId) {
        this.mostrarMensaje('No se encontraron datos de sesión. Redirigiendo al login...', 'error');
        setTimeout(() => this.router.navigate(['/login']), 2000);
        return;
      }

      const usuario = JSON.parse(usuarioJson);

      // Verificar que sea un maestro
      if (usuario.role?.toLowerCase() !== 'maestro') {
        this.mostrarMensaje('Acceso denegado. Solo maestros pueden acceder a esta sección.', 'error');
        setTimeout(() => this.router.navigate(['/login']), 2000);
        return;
      }

      // Obtener datos completos del instructor
      this.InstructorServiceService.obtenerDatosInstructor(parseInt(usuarioId)).subscribe({
        next: (datosInstructor) => {
          this.procesarDatosInstructor(datosInstructor);
        },
        error: (error) => {
          console.error('Error al obtener datos del instructor:', error);
          this.mostrarMensaje('Error al cargar datos del instructor', 'error');
          this.cargandoDatos = false;
        }
      });

    } catch (error) {
      console.error('Error al procesar datos de autenticación:', error);
      this.mostrarMensaje('Error en la autenticación', 'error');
      this.router.navigate(['/login']);
    }
  }

  /**
   * Procesa los datos del instructor obtenidos del backend
   */
  procesarDatosInstructor(datos: any): void {
    this.datosInstructor = datos;

    // Asignar el maestroId (ID del instructor)
    this.maestroId = datos.maestro?.id || datos.id || 0;

    // Obtener datos del taller asignado al maestro
    if (datos.taller) {
      this.tallerId = datos.taller.id;
      this.nombreTaller = datos.taller.nombre_taller || datos.taller.nombre || 'Taller';
    } else if (datos.talleres && datos.talleres.length > 0) {
      // Si tiene múltiples talleres, tomar el primero
      this.tallerId = datos.talleres[0].id;
      this.nombreTaller = datos.talleres[0].nombre_taller || datos.talleres[0].nombre || 'Taller';
    } else {
      // Si no tiene taller asignado, usar valores por defecto
      this.tallerId = 1;
      this.nombreTaller = `Taller de ${datos.maestro?.nombre || datos.nombre || 'Instructor'}`;
    }

    this.cargandoDatos = false;

    // Mostrar información de debug en consola
    console.log('Datos del instructor cargados:', {
      maestroId: this.maestroId,
      tallerId: this.tallerId,
      nombreTaller: this.nombreTaller,
      datosCompletos: datos
    });

    // Inicializar horarios una vez que tenemos los datos
    if (this.maestroId > 0) {
      this.inicializarMatrix();
      this.cargarHorario();
    } else {
      this.mostrarMensaje('No se pudo obtener el ID del maestro', 'error');
    }
  }

  inicializarMatrix(): void {
    // Crear matriz vacía 3x5 (3 horas x 5 días)
    this.horarioMatrix = Array(3).fill(null).map(() => Array(5).fill(''));
  }

  cargarHorario(): void {
    if (this.maestroId <= 0) {
      this.mostrarMensaje('ID de maestro inválido', 'error');
      return;
    }

    this.HorarioService.getHorarios(this.maestroId).subscribe({
      next: (horarios) => {
        this.procesarHorariosBackend(horarios);
        this.guardarEstadoOriginal();
        if (horarios && horarios.length > 0) {
          this.mostrarMensaje('Horario cargado correctamente', 'success');
        }
      },
      error: (error) => {
        console.error('Error al cargar horario:', error);
        this.mostrarMensaje('Error al cargar el horario', 'error');
      }
    });
  }

  procesarHorariosBackend(horarios: any[]): void {
    // Limpiar matriz
    this.inicializarMatrix();

    if (!horarios || horarios.length === 0) {
      return;
    }

    horarios.forEach(horario => {
      const diaIndex = this.diasSemana.indexOf(horario.dia_semana.toLowerCase());
      const horaIndex = this.horasConfig.findIndex(h =>
        h.inicio === horario.hora_inicio && h.fin === horario.hora_fin
      );

      if (diaIndex !== -1 && horaIndex !== -1) {
        this.horarioMatrix[horaIndex][diaIndex] = horario.grupo || '';
      }
    });
  }

  toggleEdicion(): void {
    if (this.editando) {
      this.guardarHorario();
    } else {
      this.iniciarEdicion();
    }
  }

  iniciarEdicion(): void {
    this.editando = true;
    this.guardarEstadoOriginal();
  }

  cancelarEdicion(): void {
    this.horarioMatrix = this.horarioOriginal.map(fila => [...fila]);
    this.editando = false;
    this.mostrarMensaje('Edición cancelada', 'warning');
  }

  guardarEstadoOriginal(): void {
    this.horarioOriginal = this.horarioMatrix.map(fila => [...fila]);
  }

  guardarHorario(): void {
    if (this.maestroId <= 0) {
      this.mostrarMensaje('Error: ID de maestro inválido', 'error');
      return;
    }

    this.guardando = true;
    const horariosParaEnviar = this.convertirMatrixAHorarios();

    const data = {
      maestro_id: this.maestroId,
      taller_id: this.tallerId,
      horarios: horariosParaEnviar
    };

    console.log('Datos a enviar:', data);

    // Si ya existe el horario, actualizar; si no, crear
    const request = this.tieneHorariosExistentes()
      ? this.HorarioService.updateHorarios(this.maestroId, data)
      : this.HorarioService.saveHorarios(data);

    request.subscribe({
      next: (response) => {
        this.editando = false;
        this.guardando = false;
        this.guardarEstadoOriginal();
        this.mostrarMensaje('Horario guardado correctamente', 'success');
      },
      error: (error) => {
        this.guardando = false;
        console.error('Error al guardar horario:', error);
        this.mostrarMensaje('Error al guardar el horario', 'error');
      }
    });
  }

  convertirMatrixAHorarios(): any[] {
    const horarios: any[] = [];

    for (let i = 0; i < this.horarioMatrix.length; i++) {
      for (let j = 0; j < this.horarioMatrix[i].length; j++) {
        const grupo = this.horarioMatrix[i][j]?.trim();

        if (grupo) {
          horarios.push({
            dia_semana: this.diasSemana[j],
            hora_inicio: this.horasConfig[i].inicio,
            hora_fin: this.horasConfig[i].fin,
            grupo: grupo,
            salon_id: null
          });
        }
      }
    }

    return horarios;
  }

  tieneHorariosExistentes(): boolean {
    return this.horarioOriginal.some(fila => fila.some(celda => celda.trim() !== ''));
  }

  mostrarMensaje(texto: string, tipo: 'success' | 'error' | 'warning'): void {
    this.mensaje = { texto, tipo };

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => {
      this.mensaje = null;
    }, 3000);
  }

  /**
   * Método para refrescar los datos (útil para debugging)
   */
  refrescarDatos(): void {
    this.cargandoDatos = true;
    this.obtenerDatosAutenticacion();
  }
 // Configuración del maestro y taller (deberías obtener esto de la ruta o servicio de autenticación)


}
