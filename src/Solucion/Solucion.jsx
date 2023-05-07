import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";

const Solucion = (bucketX) => {
  const [explicacionSolucion] = useState([
    {
      bucket: 0,
      bucketY: 0,
      explicacionSolucion: "",
    },
  ]);

  const explicacion = () => {

    // Primero se vacia el array de la solucion

    explicacionSolucion.splice(0, explicacionSolucion.length);

    // Entra al primer caso, el mas sencillo, donde los valores de X y Y ya son la medida

    if (bucketX.medida === bucketX.x + bucketX.y) {
      llenarBalde(explicacionSolucion, "x");
      llenarBalde(explicacionSolucion, "y");
    } else {
      let primerValor = bucketX.medida - bucketX.x;
      if (primerValor < 0) primerValor = primerValor * -1;
      let segundoValor = bucketX.medida - bucketX.y;
      if (segundoValor < 0) segundoValor = segundoValor * -1;

      // El siguiente caso funciona cuando x es menor a Y, pues, o se comienza del maximo de Y, o 0

      let i = 0;
      if (bucketX.x < bucketX.y) {

        // Aqui se busca la mejor solucion, para ver de que lado se puede llegar mas rapido
        //En el caso siguiente, demuestra que X esta mas lejos que Y, por lo que iremos reduciendo Y desde su maximo
        
        if (primerValor > segundoValor) {
          llenarBalde(explicacionSolucion, "y");
          while (
            bucketX.medida !==
            explicacionSolucion[i].bucket + explicacionSolucion[i].bucketY
          ) {
            i = i + 1;
            transferirBalde(
              explicacionSolucion,
              explicacionSolucion[i - 1].bucketY,
              explicacionSolucion[i - 1].bucket
            );

            i = i + 1;
            vaciarBalde(explicacionSolucion, "x");
          }
        } else {

          // en este caso, se lleva a Y vacio y se va incrementando dado que el valor esta mas cerca de X

          llenarBalde(explicacionSolucion, "x");

          while (
            bucketX.medida !==
            explicacionSolucion[i].bucket + explicacionSolucion[i].bucketY
          ) {
            i = i + 1;
            transferirBalde(
              explicacionSolucion,
              explicacionSolucion[i - 1].bucket,
              explicacionSolucion[i - 1].bucketY
            );

            i = i + 1;
            llenarBalde(explicacionSolucion, "x");
          }
        }
      } else {

        //En este caso es cuando X es mayor que Y, por lo que se hace lo contrario al caso anterior

        if (primerValor > segundoValor) {
          llenarBalde(explicacionSolucion, "y");

          while (
            bucketX.medida !==
            explicacionSolucion[i].bucket + explicacionSolucion[i].bucketY
          ) {
            i = i + 1;
            transferirBalde(
              explicacionSolucion,
              explicacionSolucion[i - 1].bucketY,
              explicacionSolucion[i - 1].bucket
            );

            i = i + 1;
            llenarBalde(explicacionSolucion, "y");

            if (i > 10) {
              return;
            }
          }
        } else {

          // en este caso, se lleva a X lleno y se va reduciendo dado que el valor esta mas cerca que Y

          llenarBalde(explicacionSolucion, "x");

          while (
            bucketX.medida !==
            explicacionSolucion[i].bucket + explicacionSolucion[i].bucketY
          ) {
            i = i + 1;
            transferirBalde(
              explicacionSolucion,
              explicacionSolucion[i - 1].bucket,
              explicacionSolucion[i - 1].bucketY
            );

            i = i + 1;
            vaciarBalde(explicacionSolucion, "y");
          }
        }
      }
    }
    explicacionSolucion[explicacionSolucion.length - 1].explanation =
      explicacionSolucion[explicacionSolucion.length - 1].explanation.concat(
        ", solved"
      );
  };

  /**
 * Vacía uno de los baldes
 * @param  {Array} arraySolucion array de la solución
 * @param  {String} balde Selecciona el balde que se quiere vaciar
 * @return {Void}      El objetivo del método es vaciar uno de los baldes, usando una condicional 
 */

  const vaciarBalde = (arraySolucion, balde) => {

    // Primero se selecciona la posición a trabajar

    let posicion = arraySolucion.length - 1;

    // Si la posición es la primera posición se ajusta la variable para no causar error

    if (posicion < 0) {
      posicion = 0;
    }

    if (balde === "x") {
      arraySolucion.push({
        bucket: 0,
        bucketY: arraySolucion[posicion].bucketY,
        explanation: "Dumb bucketX",
      });
    } 
    else 
    {
      arraySolucion.push({
        bucket: arraySolucion[posicion].bucket,
        bucketY: 0,
        explanation: "Dumb bucketY",
      });
    }
  };

   /**
 * Llena uno de los baldes
 * @param  {Array} arraySolucion array de la solución
 * @param  {String} balde Selecciona el balde que se quiere llenar
 * @return {Void}      El objetivo del método es llenar uno de los baldes, usando condicionales 
 */

  const llenarBalde = (arraySolucion, balde) => {
    if (balde === "x") {

      // Si el array esta en la primera posicion, no tendra valores anteriores, por lo que el balde que
      // no se esta llenando es 0, inicialmente

      if (arraySolucion.length - 1 < 0) {
        arraySolucion.push({
          bucket: bucketX.x,
          bucketY: 0,
          explanation: "Filled bucketX",
        });
      } 
      else
       {
        // de no ser la primera posición, se le asigna su valor anterior
        arraySolucion.push({
          bucket: bucketX.x,
          bucketY: arraySolucion[arraySolucion.length - 1].bucketY,
          explanation: "Filled bucketX",
        });
      }
    } else {

      // Si el array esta en la primera posicion, no tendra valores anteriores, por lo que el balde que
      // no se esta llenando es 0, inicialmente

      if (arraySolucion.length - 1 < 0) {
        arraySolucion.push({
          bucket: 0,
          bucketY: bucketX.y,
          explanation: "Filled bucketY",
        });
      } 
      else 
      {
        arraySolucion.push({
          bucket: arraySolucion[arraySolucion.length - 1].bucket,
          bucketY: bucketX.y,
          explanation: "Filled bucketY",
        });
      }
    }
  };

   /**
 * Transfiere uno de los baldes
 * @param  {Array} arraySolucion array de la solución
 * @param  {Number} baldeDesde Selecciona el balde que se transferir
 * @param  {Number} baldeHasta Selecciona el balde que recibe la transferencia
 * @return {Void}      El objetivo del método es transferir un balde a otro
 */

  const transferirBalde = (arraySolucion, baldeDesde, baldeHasta) => {

    // Aqui se busca cual es el balde que va a transferir todo su contenido

    let cantidad = 0;
    if (arraySolucion[arraySolucion.length - 1].bucketY === baldeDesde) {

      // una vez encontrado va a pasar todo su contenido al otro balde, aca se decide la cantidad a transferir

      if (baldeDesde > baldeHasta) {
        cantidad = bucketX.x;
      } else {
        cantidad = bucketX.y;
      }

      // finalmente dependiendo del contenido maximo, se asignan los valores

      arraySolucion.push({
        bucket: arraySolucion[arraySolucion.length - 1].bucket + cantidad,
        bucketY: arraySolucion[arraySolucion.length - 1].bucketY - cantidad,
        explanation: "Transfer bucketY to  bucketX",
      });
    } else {
      if (baldeDesde > baldeHasta) {
        cantidad = bucketX.y;
      } else {
        cantidad = bucketX.x;
      }
      arraySolucion.push({
        bucket: arraySolucion[arraySolucion.length - 1].bucket - cantidad,
        bucketY: arraySolucion[arraySolucion.length - 1].bucketY + cantidad,
        explanation: "Transfer bucketX to  bucketY",
      });
    }
  };
  useEffect(() => {
    explicacion();
  }, [bucketX.trigger]);
  return (
    <Table responsive bordered>
      <thead>
        <tr>
          <th className="tg-0labucketX tebucketXt-center">BucketX</th>
          <th className="tg-0labucketX tebucketXt-center">BucketY</th>
          <th className="tg-0labucketX tebucketXt-center ">explanation</th>
        </tr>
      </thead>
      <tbody>
        {explicacionSolucion.map((item, index) => (
          <tr key={index}>
            <td>{item.bucket}</td>
            <td>{item.bucketY}</td>
            <td>{item.explanation}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default Solucion;
