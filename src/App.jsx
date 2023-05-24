import { useState } from "react";

import "./App.css";
import Solucion from "./Solucion/Solucion";
import { Form } from "react-bootstrap";

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [trigger, setTrigger] = useState(false);
  const [tieneSolucion, setTieneSolucion] = useState(false);

  const store = async (e) => {
    e.preventDefault();

    setTrigger(!trigger);

    if (revision(x, y, z)) {
      // const tieneSolucionAhora = verificarSolucion(x, y, z);
      const tieneSolucionAhora = true
      console.log(x, y, z);
      console.log(gcd(x,y,z));
      setTieneSolucion(tieneSolucionAhora);
    }
  };
  //Se usa la siguiente funcion para determinar validez de datos
  const revision = (x, y, z) =>
    Number.isInteger(x) &&
    Number.isInteger(y) &&
    Number.isInteger(z) &&
    x > 0 &&
    y > 0 &&
    z > 0;
  // La siguiente se usa para confirmar si tiene solucion
  const verificarSolucion = (x, y, z) =>
    (!(z > x + y) &&
      !(z > x && z > y) &&
      ((z % x === 0 && y > z) || (z % y === 0 && x > z))) ||
    z === x + y;
  /* Este es el maximo comun divisor, lo que permite saber si se puede alcanzar el valor de Z a traves de las
 funciones establecidas */
 /* const euclideanExtendedAlgorithm = (x, y, z) => {
  let r0 = x;
  let r1 = y;
  let s0 = 1;
  let s1 = 0;
  let t0 = 0;
  let t1 = 1;

  while (r1 !== 0) {
    const quotient = Math.floor(r0 / r1);

    const tempR = r0;
    const tempS = s0;
    const tempT = t0;

    r0 = r1;
    s0 = s1;
    t0 = t1;

    r1 = tempR - quotient * r1;
    s1 = tempS - quotient * s1;
    t1 = tempT - quotient * t1;
  }

  if (r0 === 0 || z % r0 !== 0) {
    // No solution exists
    return null;
  }

  const a = s0 * (z / r0);
  const b = t0 * (z / r0);

  return { a, b };
} */

 function gcd(a , b) {
        if (b == 0)
            return a;
 
        return gcd(b, a % b);
    }

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
      {tieneSolucion && <Solucion x={x} y={y} medida={z} trigger={trigger} />}

      {!tieneSolucion && <h3>No tiene Solucion</h3>}
    </>
  );
}

export default App;
