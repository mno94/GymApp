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
                        ejercicios.forEach((ejercicio, index) => {
                            const ejercicioDiv = document.createElement('div');
                            ejercicioDiv.classList.add('ejercicio');

                            const nombreEjercicio = document.createElement('h3');
                            nombreEjercicio.textContent = ejercicio.nombre;
                            ejercicioDiv.appendChild(nombreEjercicio);

                            const detallesEjercicio = document.createElement('p');
                            detallesEjercicio.textContent = `Repeticiones: ${ejercicio.repeticiones} | Series: ${ejercicio.series} | Peso: ${ejercicio.peso}`;
                            ejercicioDiv.appendChild(detallesEjercicio);

                            // Línea divisoria entre ejercicios
                            if (index < ejercicios.length - 1) {
                                const hr = document.createElement('hr');
                                ejercicioDiv.appendChild(hr);
                            }

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

            // Manejar los eventos de clic para los botones de día
            const btnDia1 = document.getElementById('btn-dia-1');
            const btnDia2 = document.getElementById('btn-dia-2');
            const btnDia3 = document.getElementById('btn-dia-3');

            btnDia1.addEventListener('click', () => mostrarDia('Dia 1'));
            btnDia2.addEventListener('click', () => mostrarDia('Dia 2'));
            btnDia3.addEventListener('click', () => mostrarDia('Dia 3'));

            // Manejar el evento de marcar todos los ejercicios
            const checkTodos = document.getElementById('check-todos');
            checkTodos.addEventListener('change', function() {
                const checkboxes = document.querySelectorAll('.ejercicio input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = this.checked;
                });
            });

            // Manejar el evento de desmarcar todos los ejercicios
            const checkNinguno = document.getElementById('check-ninguno');
            checkNinguno.addEventListener('change', function() {
                const checkboxes = document.querySelectorAll('.ejercicio input[type="checkbox"]');
                checkboxes.forEach(checkbox => {
                    checkbox.checked = false;
                });
                checkTodos.checked = false; // Desmarcar también el checkbox de "marcar todos"
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});
