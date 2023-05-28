import { useState } from "react";
import { Table } from "react-bootstrap";

import "./App.css";
// import Solucion from "./Solucion/Solucion";
import { Form } from "react-bootstrap";

const App = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const [arraySolucion,setArraySolucion] = useState([]);
  const [tieneSolucion, setTieneSolucion] = useState(false);
  

  const store = async (e) => {
    e.preventDefault();

    setTrigger(!trigger);

    if (revision(x, y, z)) {
      // const tieneSolucionAhora = verificarSolucion(x, y, z);
      const tieneSolucionAhora = true;
      console.log(x, y, z);
      const arraySolucionX = [];
      const arraySolucionY = [];
      
      const solucion = minSteps(x, y, z, arraySolucionX, arraySolucionY);
      console.log("solucion", solucion, "x", arraySolucionX.length);
      if (solucion === arraySolucionX.length) {
        arraySolucionX[arraySolucionX.length - 1].explanation =
          arraySolucionX[arraySolucionX.length - 1].explanation.concat(
            ", solved"
          );
        setArraySolucion(arraySolucionX.slice());
      } else {
        arraySolucionY[arraySolucionY.length - 1].explanation =
          arraySolucionY[arraySolucionY.length - 1].explanation.concat(
            ", solved"
          );
          setArraySolucion(arraySolucionY.slice());
      }
      

      setTieneSolucion(tieneSolucionAhora);
    }
  };
  //Se usa la siguiente funcion para determinar validez de datos
  const revision = (x, y, z) =>
    (Number.isInteger(x) &&
      Number.isInteger(y) &&
      Number.isInteger(z) &&
      x > 0 &&
      y > 0 &&
      z > 0) ||
    // If gcd of n and m does not divide d
    // then solution is not possible
    z % gcd(x, y) != 0;
  // La siguiente se usa para confirmar si tiene solucion

  /* Este es el maximo comun divisor, lo que permite saber si se puede alcanzar el valor de Z a traves de las
 funciones establecidas */
  const gcd = (a, b) => {
    if (b == 0) return a;

    return gcd(b, a % b);
  };

  /*
     fromCap -- Capacity of jug from which
     water is poured toCap -- Capacity of
      jug to which water is poured
      d -- Amount to be measured
     */
  const pour = (fromCap, toCap, d, arraySolucion, fromLabel, toLabel) => {
    // Initialize current amount of water
    // in source and destination jugs
    let from = fromCap;
    let to = 0;
    let step = 1;

    llenarBalde(arraySolucion, fromLabel, fromCap, toLabel, to);

    // Break the loop when either of the two
    // jugs has d litre water
    while (from + to != d) {
      // Find the maximum amount that can be
      // poured
      var temp = Math.min(from, toCap - to);
      transferirBalde(arraySolucion, toLabel, fromLabel, temp, to, from);

      to += temp;
      from -= temp;
      step++;

      if (from + to == d) break;

      // If first jug becomes empty, fill it
      if (from == 0) {
        from = fromCap;
        step++;
        llenarBalde(arraySolucion, fromLabel, from, toLabel, to);
      }

      // If second jug becomes full, empty it
      if (to == toCap) {
        to = 0;
        step++;
        vaciarBalde(arraySolucion, toLabel, fromLabel, from);
      }
    }
    return step;
  };

  // Returns count of minimum steps needed to
  // measure d liter
  const minSteps = (m, n, d, arraySolucionX, arraySolucionY) => {
    // Return minimum two cases:
    // a) Water of n liter jug is poured into
    // m liter jug
    // b) Vice versa of "a"

    return Math.min(
      pour(n, m, d, arraySolucionX, "x", "y"), // n to m
      pour(m, n, d, arraySolucionY, "y", "x")
    ); // m to n
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
   * @param  {String} baldeQueTransfiere Selecciona el balde que se va a transferir
   * @param  {String} baldeTransferido Selecciona el balde que recibe la transferencia
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

  return (
    <>
      <div>
        <h3>Introduzca los datos requeridos</h3>
        <form onSubmit={store}>
          <div className="mb-3">
            <Form.Label className="mt-3 fw-bold">X</Form.Label>

            <input
              value={x}
              onChange={(e) => setX(parseInt(e.target.value))}
              type="number"
              className="form-control"
            />
          </div>
          <div>
            <Form.Label className="mt-3 fw-bold">Y</Form.Label>
            <input
              value={y}
              onChange={(e) => setY(parseInt(e.target.value))}
              type="number"
              className="form-control"
            />
          </div>
          <div>
            <Form.Label className="mt-3 fw-bold">Z</Form.Label>
            <input
              value={z}
              onChange={(e) => setZ(parseInt(e.target.value))}
              type="number"
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
      {tieneSolucion && 
      <Table responsive bordered>
      <thead>
        <tr>
          <th className="tg-0labucketX tebucketXt-center">BucketX</th>
          <th className="tg-0labucketX tebucketXt-center">BucketY</th>
          <th className="tg-0labucketX tebucketXt-center ">explanation</th>
        </tr>
      </thead>
      <tbody>
        
     { arraySolucion.map((item, index) => (
            <tr key={index}>
              <td>{item.x}</td>
              <td>{item.y}</td>
              <td>{item.explanation}</td>
            </tr>
          ))}
      </tbody>
    </Table> 
    }

      {!tieneSolucion && <h3>No tiene Solucion</h3>}
    </>
  );
};

export default App;
