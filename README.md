# Bucket-challenge
First Proyect for my application in Chicks Group as a Frontend Developer
Este Proyecto se hizo con la intención de superar el primer reto de la aplicación para Frontend Developer. A continuación se encuentran los pasos para poder ejecutar el proyecto:

Una vez instalado Git, selecciona una ubicación en tu directorio. Para poder clonar este repositorio, dar Click derecho en el directorio seleccionado (si te encuentras en window) y seleccionar "Git Bash Here" esta terminal te servira para poder clonarlo. Inicialmente, copia el link del repositorio, que es el siguiente, sin comillas "https://github.com/Terrakill5/Bucket-challenge" luego en el terminal escribe "git clone https://github.com/Terrakill5/Bucket-challenge" con esto se clonara este repositorio en tu directorio.

El siguiente paso es entrar en Visual Studio Code, abrir la carpeta como carpeta de trabajo, y ya seleccionado, en la terminal de Visual Studio, que se selecciona en la ventanilla superior como "terminal" -> "nueva terminal".

Si ya tienes instalado el paquete de NodeJs, puedes escribir en la terminal "npm i" o "npm install" esto se debe a que en el archivo package.json existen paquetes que hace falta para que el proyecto pueda funcionar, y el anterior comando instalara esos paquetes automaticamente.

Una vez terminado, usando el siguiente comando "npm run dev" creara un host para el proyecto y yendo a la direccion que te indica la terminal podras empezar a interactuar con el sistema

A partir de aca comienza la explicación de cómo funciona el proyecto.

El reto es que tenemos 2 baldes, que solo pueden usar las funciones de "llenado", "vaciado" y "transferir", este ultimo se trata de vaciar un balde para pasar todo su contenido al otro. Primeramente tenemos una validación que solo permite que tanto en la X como en la Y y Z solo puedan ser introducidos valores mayores o iguales a 0, luego viene la comprobación de que exista una Solucion para los valores dados, caso contrario, debajo de los inputs se seguirá mostrando que no existe solucion. Una vez superadas estas validaciones, se pasa el proceso de encontrar la mejor solucion, primeramente se ve cual es la distancia de la solucion para cada balde, el de menor distancia o valor es la vía que elegiremos para dar la solución. El siguiente paso es ver cual es el balde con más volumen, dependiendo de esto se decidirá el proceso de solución.

Un ejemplo seria que si tenemos x = 5,y=20 y z=15, la menor distancia a la solucion es a través de y=20, el primer paso siendo que siempre se comienza con baldes vacíos, seria llenar Y, el segundo paso es trasferir el volumen de Y a X, dejando x=5 y y=15, el tercer y último paso seria vaciar X, tras estos simples 3 pasos hemos llegado a la mejor solución. Este proyecto te guiará paso a paso por la mejor solución y descubrirás la interactividad que te muestra React!

Gracias por acompañarme a través de esta documentación!
