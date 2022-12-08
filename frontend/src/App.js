import React from 'react';
// 👇️ import Routes instead of Switch 👇️
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';


import ProcedurePage from "./pages/homepage/ProcedurePage";
import ViewPage from "./pages/viewpage/ViewPage";
// import add_owner_page from './pages/add_owner_page/add_owner_page';

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link 
              to="/"
              style={{fontSize : "x-large"}}
              >
                Procedure Page</Link>
            </li>
            <li>
              <Link 
              to="/ViewPage"
              style={{fontSize : "x-large"}}
              >
                View Page</Link>
            </li>
          </ul>
        </nav>

        {/* Wrap your Route components in a Routes component */}
        <Routes>
          <Route path="/" element={<ProcedurePage />} />
          <Route path="/ViewPage" element={<ViewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

