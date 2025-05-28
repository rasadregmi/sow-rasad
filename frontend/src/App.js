import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Terms from './pages/terms.js';
import Pricelist from './pages/pricelist.js';
import { ToastContainer } from './components/Toast.js';
import './styles/styles.css';
import './styles/pricelist.css';
import './styles/terms.css';
import './styles/switch.css';
import './styles/toast.css';

function App() {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Navigate to="/terms" replace />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="pricelist" element={<Pricelist/>}/>
      </Routes>
    </Router>
  );
}

export default App;