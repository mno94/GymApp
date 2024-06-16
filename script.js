$(document).ready(function() {
    // Ruta del archivo JSON
    var jsonFile = 'rutinas.json';
    
    // Función para cargar y mostrar las rutinas
    function mostrarRutinas() {
        $.getJSON(jsonFile, function(data) {
            // Limpiar el contenedor
            $('#rutinas-container').empty();
            
            // Iterar sobre cada día en el JSON
            $.each(data, function(index, dia) {
                // Crear un contenedor para cada día
                var dayContainer = $('<div>').addClass('day-container');
                
                // Agregar el título del día
                dayContainer.append($('<h2>').text(index));
                
                // Crear una lista para los ejercicios de este día
                var exercisesList = $('<ul>').addClass('exercises-list');
                
                // Iterar sobre los ejercicios de este día
                $.each(dia, function(key, value) {
                    // Ignorar las claves que corresponden a los títulos de los días
                    if (key !== "") {
                        // Crear un elemento de lista para cada ejercicio
                        var exerciseItem = $('<li>').addClass('exercise-item');
                        exerciseItem.append($('<h3>').text(key));
                        
                        // Verificar si hay detalles del ejercicio (repeticiones, series, peso)
                        if (value && value.Repeticiones !== undefined) {
                            exerciseItem.append($('<p>').text('Repeticiones: ' + value.Repeticiones));
                            exerciseItem.append($('<p>').text('Series: ' + value.Series));
                            exerciseItem.append($('<p>').text('Peso: ' + value.Peso));
                        } else {
                            exerciseItem.append($('<p>').text('Sin detalles'));
                        }
                        
                        // Agregar el ejercicio a la lista de ejercicios
                        exercisesList.append(exerciseItem);
                    }
                });
                
                // Agregar la lista de ejercicios al contenedor del día
                dayContainer.append(exercisesList);
                
                // Agregar el contenedor del día al cuerpo del documento
                $('#rutinas-container').append(dayContainer);
            });
        })
        .fail(function() {
            console.error('Error al cargar el archivo JSON.');
        });
    }
    
    // Llamar a la función para mostrar las rutinas al cargar la página
    mostrarRutinas();
});
