import { useState } from 'react';
import Todos from './reducers/reducer'
import '../node_modules/material-components-web/dist/material-components-web.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

interface Props {}

const App: React.FC<Props> = () => {
  const [frontend, setFrontend] = useState("material")

  function setFrontEnd(event: React.FormEvent<HTMLSelectElement>){
    setFrontend(event.currentTarget.value)
  }
  return (
    <div>
      <select onChange={(event: React.FormEvent<HTMLSelectElement>)=>setFrontEnd(event)} style={{position: 'absolute'}} name="frontend" id="frontend">
        <option value="material">Material Design</option>
        <option value="bootstrap">Bootstrap</option>
        <option value="ant">Ant</option>
        <option value="tailwind">Tailwind</option>
      </select>

      <div className="App">
        <Todos frontend={frontend} />
      </div>
    </div>
  );
}

export default App;
