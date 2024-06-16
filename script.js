document.addEventListener("DOMContentLoaded", function() {
    const url = 'rutinas.json';

    // Elemento donde se mostrarán los ejercicios
    const ejercicioContainer = document.getElementById('ejercicios-container');

    // Cargar el JSON de rutinas
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Datos cargados:', data);
            const dias = data;

            // Función para mostrar los ejercicios del día seleccionado
            function mostrarDia(dia) {
                // Limpiar contenido anterior
                ejercicioContainer.innerHTML = '';

                // Encontrar el día en los datos
                const diaSeleccionado = dias.find(item => item.dia === dia);

                if (diaSeleccionado) {
                    const ejercicios = diaSeleccionado.ejercicios;

                    if (ejercicios.length > 0) {
                        ejercicios.forEach(ejercicio => {
                            const ejercicioDiv = document.createElement('div');
                            ejercicioDiv.classList.add('ejercicio');

                            // Crear checkbox para marcar el ejercicio
                            const checkbox = document.createElement('input');
                            checkbox.type = 'checkbox';
                            checkbox.classList.add('ejercicio-checkbox');
                            ejercicioDiv.appendChild(checkbox);

                            const nombreEjercicio = document.createElement('h3');
                            nombreEjercicio.textContent = ejercicio.nombre;
                            ejercicioDiv.appendChild(nombreEjercicio);

                            const detallesEjercicio = document.createElement('p');
                            detallesEjercicio.textContent = `Repeticiones: ${ejercicio.repeticiones} | Series: ${ejercicio.series} | Peso: ${ejercicio.peso}`;
                            ejercicioDiv.appendChild(detallesEjercicio);

                            ejercicioContainer.appendChild(ejercicioDiv);
                        });
                    } else {
                        const mensaje = document.createElement('p');
                        mensaje.textContent = 'No se encontraron ejercicios para este día.';
                        ejercicioContainer.appendChild(mensaje);
                    }
                } else {
                    const mensaje = document.createElement('p');
                    mensaje.textContent = 'Día no encontrado en los datos.';
                    ejercicioContainer.appendChild(mensaje);
                }
            }

            // Agregar event listeners a los botones de días
            const btnDia1 = document.getElementById('btn-dia-1');
            const btnDia2 = document.getElementById('btn-dia-2');
            const btnDia3 = document.getElementById('btn-dia-3');

            btnDia1.addEventListener('click', () => mostrarDia('Dia 1'));
            btnDia2.addEventListener('click', () => mostrarDia('Dia 2'));
            btnDia3.addEventListener('click', () => mostrarDia('Dia 3'));
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});
