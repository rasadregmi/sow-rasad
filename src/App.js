import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Terms from './pages/terms.js';
import Pricelist from './pages/pricelist.js';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from / to /terms */}
        <Route path="/" element={<Navigate to="/terms" replace />} />

        {/* Terms page */}
        <Route path="/terms" element={<Terms />} />
        <Route path="pricelist" element={<Pricelist/>}/>
      </Routes>
    </Router>
  );
}

export default App;