import {Button} from 'antd';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          APSI <code>frontend</code> project
        </p>
          <Button type='primary'>Test button</Button>
      </header>
    </div>
  );
}

export default App;
