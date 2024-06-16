document.addEventListener("DOMContentLoaded", function() {
    const url = 'rutinas.json';

    // Elemento donde se mostrarán los ejercicios
    const ejercicioContainer = document.getElementById('ejercicios-container');

    // Cargar el JSON de rutinas
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
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

            // Función para mostrar los botones de días
            function mostrarDias() {
                const botonesDias = document.createElement('div');
                botonesDias.classList.add('botones-dias');
                
                dias.forEach(item => {
                    const btnDia = document.createElement('button');
                    btnDia.textContent = item.dia;
                    btnDia.classList.add('day-button');
                    btnDia.addEventListener('click', () => mostrarDia(item.dia));
                    botonesDias.appendChild(btnDia);
                });

                ejercicioContainer.appendChild(botonesDias);
            }

            // Mostrar botones de días al cargar la página
            mostrarDias();
        })
        .catch(error => {
            console.error('Error al cargar el JSON:', error);
            const mensajeError = document.createElement('p');
            mensajeError.textContent = 'Ocurrió un error al cargar las rutinas.';
            ejercicioContainer.appendChild(mensajeError);
        });
});
