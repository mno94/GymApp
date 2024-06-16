document.addEventListener("DOMContentLoaded", function() {
    const url = 'rutinas.json';

    // Elemento donde se mostrarán los ejercicios
    const ejercicioContainer = document.getElementById('ejercicios-container');

    // Función para crear una casilla de verificación
    function crearCheckbox() {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'ejercicio-checkbox';
        return checkbox;
    }

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

                            const nombreEjercicio = document.createElement('h3');
                            nombreEjercicio.textContent = ejercicio.nombre;
                            ejercicioDiv.appendChild(nombreEjercicio);

                            const detallesEjercicio = document.createElement('p');
                            detallesEjercicio.textContent = `Repeticiones: ${ejercicio.repeticiones} | Series: ${ejercicio.series} | Peso: ${ejercicio.peso}`;
                            ejercicioDiv.appendChild(detallesEjercicio);

                            // Casilla de verificación para marcar el ejercicio realizado
                            const checkbox = crearCheckbox();
                            ejercicioDiv.appendChild(checkbox);

                            ejercicioContainer.appendChild(ejercicioDiv);
                        });

                        // Botón para desmarcar todos los ejercicios
                        const btnDesmarcarTodos = document.createElement('button');
                        btnDesmarcarTodos.textContent = 'Desmarcar todos';
                        btnDesmarcarTodos.addEventListener('click', function() {
                            const checkboxes = document.querySelectorAll('.ejercicio-checkbox');
                            checkboxes.forEach(checkbox => {
                                checkbox.checked = false;
                            });
                        });
                        ejercicioContainer.appendChild(btnDesmarcarTodos);

                        // Botón de volver
                        const btnVolver = document.createElement('button');
                        btnVolver.textContent = 'Volver';
                        btnVolver.className = 'volver';
                        btnVolver.addEventListener('click', function() {
                            ejercicioContainer.innerHTML = ''; // Limpiar la lista de ejercicios
                            mostrarBotonesDias(); // Mostrar nuevamente los botones de días
                        });
                        ejercicioContainer.appendChild(btnVolver);

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
            function mostrarBotonesDias() {
                const botonesDias = document.createElement('div');
                botonesDias.classList.add('botones-dias');
                botonesDias.innerHTML = `
                    <button id="btn-dia-1">Día 1</button>
                    <button id="btn-dia-2">Día 2</button>
                    <button id="btn-dia-3">Día 3</button>
                `;
                ejercicioContainer.appendChild(botonesDias);

                // Agregar evento click a cada botón de día
                const btnDia1 = document.getElementById('btn-dia-1');
                const btnDia2 = document.getElementById('btn-dia-2');
                const btnDia3 = document.getElementById('btn-dia-3');

                btnDia1.addEventListener('click', () => mostrarDia('Dia 1'));
                btnDia2.addEventListener('click', () => mostrarDia('Dia 2'));
                btnDia3.addEventListener('click', () => mostrarDia('Dia 3'));
            }

            // Mostrar inicialmente los botones de días
            mostrarBotonesDias();

        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});
