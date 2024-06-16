document.addEventListener('DOMContentLoaded', () => {
    fetch('rutinas.json')
        .then(response => response.json())
        .then(data => mostrarRutinas(data))
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

function mostrarRutinas(rutinas) {
    const contenedor = document.getElementById('contenedor-rutinas');
    
    rutinas.forEach((rutina, indexRutina) => {
        const rutinaDiv = document.createElement('div');
        rutinaDiv.classList.add('rutina');

        const rutinaTitulo = document.createElement('h2');
        rutinaTitulo.textContent = rutina.dia;
        rutinaDiv.appendChild(rutinaTitulo);

        rutina.ejercicios.forEach(ejercicio => {
            if (ejercicio.nombre === "") {
                // Añadir un espacio entre ejercicios
                const separador = document.createElement('div');
                separador.style.height = '20px';
                rutinaDiv.appendChild(separador);
            } else {
                const ejercicioDiv = document.createElement('div');
                ejercicioDiv.classList.add('ejercicio');

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';

                const label = document.createElement('label');
                label.textContent = `${ejercicio.nombre} - ${ejercicio.repeticiones} reps x ${ejercicio.series} series`;

                const inputNota = document.createElement('input');
                inputNota.type = 'text';
                inputNota.maxLength = 10;
                inputNota.placeholder = 'Peso';
                inputNota.value = ejercicio.peso;

                ejercicioDiv.appendChild(checkbox);
                ejercicioDiv.appendChild(label);
                ejercicioDiv.appendChild(inputNota);
                rutinaDiv.appendChild(ejercicioDiv);
            }
        });

        contenedor.appendChild(rutinaDiv);
    });
}
