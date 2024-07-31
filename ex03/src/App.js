
import './App.css';
import { Container } from 'react-bootstrap';
import Toppage from './components/Toppage';
import BottomPage from './components/BottomPage';
import MenuPage from './components/MenuPage';

function App() {
  return (
    <Container>
      <Toppage/>
      <MenuPage/>
      <BottomPage/>
    </Container>
  );
}

export default App;
