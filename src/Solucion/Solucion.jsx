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
  const [encontradaSolucion, setEncontradaSolucion] = useState(false);

  const explicacion = () => {
    console.log("entra a solucion",bucketX.x,bucketX.y,bucketX.z);
    setEncontradaSolucion(false);
    // Primero se vacia el array de la solucion

    explicacionSolucion.splice(0, explicacionSolucion.length);

    // Entra al primer caso, el mas sencillo, donde los valores de X y Y ya son la medida

    if (bucketX.medida === bucketX.x + bucketX.y) {
      llenarBalde(explicacionSolucion, "bucket", bucketX.x, "bucketY", 0);
      llenarBalde(
        explicacionSolucion,
        "bucketY",
        bucketX.y,
        "bucket",
        bucketX.x
      );
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
          llenarBalde(explicacionSolucion, "bucketY", bucketX.y, "bucket", 0);
          while (
            bucketX.medida !==
            explicacionSolucion[i].bucket + explicacionSolucion[i].bucketY
          ) {
            i = i + 1;

            transferirBalde(
              explicacionSolucion,
              "bucket",
              "bucketY",
              bucketX.x,
              explicacionSolucion[i - 1].bucket,
              explicacionSolucion[i - 1].bucketY
            );

            i = i + 1;
            vaciarBalde(
              explicacionSolucion,
              "bucket",
              "bucketY",
              explicacionSolucion[i - 1].bucketY
            );
          }
        } else {
          // en este caso, se lleva a Y vacio y se va incrementando dado que el valor esta mas cerca de X

          llenarBalde(explicacionSolucion, "bucket", bucketX.x, "bucketY", 0);

          while (
            bucketX.medida !==
            explicacionSolucion[i].bucket + explicacionSolucion[i].bucketY
          ) {
            i = i + 1;

            transferirBalde(
              explicacionSolucion,
              "bucketY",
              "bucket",
              bucketX.x,
              explicacionSolucion[i - 1].bucketY,
              explicacionSolucion[i - 1].bucket
            );

            i = i + 1;
            llenarBalde(
              explicacionSolucion,
              "bucket",
              bucketX.x,
              "bucketY",
              explicacionSolucion[i - 1].bucketY
            );
          }
        }
      } else {
        //En este caso es cuando X es mayor que Y, por lo que se hace lo contrario al caso anterior

        if (primerValor > segundoValor) {
          llenarBalde(explicacionSolucion, "bucketY", bucketX.y, "bucket", 0);

          while (
            bucketX.medida !==
            explicacionSolucion[i].bucket + explicacionSolucion[i].bucketY
          ) {
            i = i + 1;

            transferirBalde(
              explicacionSolucion,
              "bucket",
              "bucketY",
              bucketX.y,
              explicacionSolucion[i - 1].bucket,
              explicacionSolucion[i - 1].bucketY
            );

            i = i + 1;
            llenarBalde(
              explicacionSolucion,
              "bucketY",
              bucketX.y,
              "bucket",
              explicacionSolucion[i - 1].bucket
            );
          }
        } else {
          // en este caso, se lleva a X lleno y se va reduciendo dado que el valor esta mas cerca que Y

          llenarBalde(explicacionSolucion, "bucket", bucketX.x, "bucketY", 0);

          while (
            bucketX.medida !==
            explicacionSolucion[i].bucket + explicacionSolucion[i].bucketY
          ) {
            i = i + 1;
            transferirBalde(
              explicacionSolucion,
              "bucketY",
              "bucket",
              bucketX.y,
              explicacionSolucion[i - 1].bucketY,
              explicacionSolucion[i - 1].bucket
            );

            i = i + 1;
            vaciarBalde(
              explicacionSolucion,
              "bucketY",
              "bucket",
              explicacionSolucion[i - 1].bucket
            );
          }
        }
      }
    }

    explicacionSolucion[explicacionSolucion.length - 1].explanation =
      explicacionSolucion[explicacionSolucion.length - 1].explanation.concat(
        ", solved"
      );
    setEncontradaSolucion(true);
  };

  /**
   * Vacía uno de los baldes
   * @param  {Array} arraySolucion array de la solución
   * @param  {String} nombreBaldeVaciar Selecciona el balde que se quiere vaciar
   * @param  {String} nombreResto Selecciona el balde que va a tener o la posición anterior o inicia en 0
   * @param  {Number} valorResto Selecciona el valor del balde con su valor inicial o valor de posicion anterior
   * @return {Void}      El objetivo del método es vaciar uno de los baldes, usando una condicional
   */

  const vaciarBalde = (
    arraySolucion,
    nombreBaldeVaciar,
    nombreResto,
    valorResto
  ) => {
    arraySolucion.push({
      [nombreBaldeVaciar]: 0,
      [nombreResto]: valorResto,
      explanation: `Dumb ${nombreBaldeVaciar}`,
    });
  };

  /**
   * Llena uno de los baldes
   * @param  {Array} arraySolucion array de la solución
   * @param  {String} nombreBalde Selecciona el balde que se quiere llenar
   * @param  {String} nombreResto Selecciona el balde que va a tener o la posición anterior o inicia en 0
   * @param  {Number} valorBalde Selecciona el valor del balde con que se va a llenar
   * @param  {Number} valorResto Selecciona el valor del balde con su valor inicial o valor de posicion anterior
   * @return {Void}      El objetivo del método es llenar uno de los baldes, usando condicionales
   */

  const llenarBalde = (
    arraySolucion,
    nombreBalde,
    valorBalde,
    nombreResto,
    valorResto
  ) => {
    arraySolucion.push({
      [nombreBalde]: valorBalde,
      [nombreResto]: valorResto,
      explanation: `Filled ${nombreBalde}`,
    });
  };

  /**
   * Transfiere uno de los baldes
   * @param  {Array} arraySolucion array de la solución
   * @param  {Number} baldeQueTransfiere Selecciona el balde que se va a transferir
   * @param  {Number} baldeTransferido Selecciona el balde que recibe la transferencia
   * @param {Number} referencia Valor de referencia que se va a transferir
   * @param  {Number} valorAnteriorTransferido Selecciona el balde se va a incrementar por la referencia
   * @param  {Number} valorAnteriorTransfiere Selecciona el balde que va a reducir por la referencia
   * @return {Void}      El objetivo del método es transferir un balde a otro
   */

  const transferirBalde = (
    arraySolucion,
    baldeTransferido,
    baldeQueTransfiere,
    referencia,
    valorAnteriorTransferido,
    valorAnteriorTransfiere
  ) => {
    arraySolucion.push({
      [baldeTransferido]: valorAnteriorTransferido + referencia,
      [baldeQueTransfiere]: valorAnteriorTransfiere - referencia,
      explanation: `Transfer ${baldeQueTransfiere} to  ${baldeTransferido} `,
    });
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
        {encontradaSolucion &&
          explicacionSolucion.map((item, index) => (
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
