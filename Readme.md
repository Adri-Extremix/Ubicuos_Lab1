# Inemuri


Inemuri es una aplicación que te despierta a través de vibraciones cuando el usuario se acerca al objetivo. Para conseguir esto el usuario únicamente tiene que colocar un marcador en su destino.

### Autor
Adrián Fernández Galán - 100472182 - Grupo 81

## Tematización

La aplicación se ha desarrollado con la idea de que la vibración ocurra al ritmo de los latidos de un corazón, a su vez el marcador que se ajusta a la posición del usuario es un corazón que también late. La frecuencia de los latidos dependen de la cercanía al destino, cuanto más cerca se esté del objetivo mayor será la frecuencia del latido.

## Funcionalidades

Además de mostrar un mapa con la ubicación del usuario, la capacida de colocar un destino y vibrar cuando se acerce; la aplicación aporta una serie de funcionalidades adicionales.

-   Menú desplegable: En este menú se mostrarán algunas de las características de la aplicación
    -   Fijado del marcador del destino: Para evitar que se pueda tocar la pantalla sin intención y cambiar el destino se ha optado por la opción de fijar el marcador para que no se pueda cambiar el destino si este campo está activado.
    -   Eliminación del marcador del destino: Con el objetivo de quitar la vibración si se ha colocado mal el destino se puede quitar el marcador clickando en el botón
    -   Cambio del radio del círculo: Se mostrará una barra, donde se podrá modificar el radio del círculo que acompaña al marcador. Esto afectará al rango de los distintos tipos de intervalos de los latidos.
-   Cambio de destino con el toque: Si se pulsa en cualquier posición del mapa con la opción de fijado del marcador desactivada se podrá cambiar la posición del marcador del destino
-   Centrado del mapa: En la parte inferior derecha se muestra un icono, el cual si que toca se centrará el mapa en la posición del usuario

## Pruebas

Las pruebas realizadas han sido realizadas a través de la extensión de visual studio code llamada live server, tanto en un ordenador,simulando el dispositivo móvil, como en un dispositivo móvil.
Durante las pruebas en el ordenador se ha podido comprobar que todo funciona correctamente excepto la vibración, por motivos obvios, y el botón de centrado únicamente en Chrome. Esta última funcionalidad ha sido probada de la misma manera en Firefox y funciona correctamente.
Para la evaluación es recomendable el uso del dispositivo móvil.
