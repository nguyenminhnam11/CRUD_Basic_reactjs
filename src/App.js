import { Container } from 'react-bootstrap';
import './App.css';

import { ToastContainer } from 'react-toastify';
import ListEmployee from './pages/ListEmployee/ListEmployee';

function App() {
  return (
    <div>
      <Container>
        <ListEmployee />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </Container>
    </div>
  );
}

export default App;
