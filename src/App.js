import logo from './logo.svg';
import './App.css';
import EventosTabla from "./components/EventosTabla"
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="App">
      <h1>Gestión de Eventos</h1>
      <EventosTabla />

      <Toaster />
    </div>
  );
}

export default App;
