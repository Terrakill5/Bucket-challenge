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
      const tieneSolucionAhora = verificarSolucion(x, y, z);
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

  /* if (z > x + y || (z>x && z>y)){
      return false
    } */

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
