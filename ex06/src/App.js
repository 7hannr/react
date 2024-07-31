import './App.css';
import { Container } from 'react-bootstrap';
import MenuPage from './components/common/MenuPage';
import { useState } from 'react';
import { BoxContext} from './components/common/BoxContext'
import Box from './components/common/Box';

function App() {
  const [box, setBox] = useState('');
  const [user, setUser] = useState({
    uid:'',
    uname:''
  });

  return (
      <BoxContext.Provider value={{box, setBox, user, setUser}}>
        <Container>
            <MenuPage/>
        </Container>
        {box.show && <Box box={box} setBox={setBox}/>}
      </BoxContext.Provider>

  );
}

export default App;