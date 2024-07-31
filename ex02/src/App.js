import { Container } from 'react-bootstrap';
import './App.css';
import Header from './Header';
import Bottom from './Bottom';
import Menubar from './Menubar';

const App = () => {
   return (
      <Container>
          <Header/>
          <Menubar/>
          <Bottom/>
      </Container>
    );
}

export default App;
