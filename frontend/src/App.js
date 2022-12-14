import React from 'react';
// import axios from "axios";
//  import Routes instead of Switch 
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';


// imports for procedure
import ProcedurePage from "./pages/homepage/ProcedurePage";
import ViewPage from "./pages/viewpage/ViewPage";
import Addownerpage from "./pages/add_owner/add_owner_page";
import Addemployeepage from './pages/add_employee/add_employee_page';
import Addpilotrolepage from './pages/add_pilot_role/add_pilot_role_page';
import Addworkerrolepage from './pages/add_worker_role/add_worker_role_page';
import Addingredientpage from './pages/add_ingredient/add_ingredient_page';
import Adddronepage from './pages/add_drone/add_drone_page';
import Addrestaurantpage from './pages/add_restaurant/add_restaurant_page';
import Addservicepage from './pages/add_service/add_service_page';
import Addlocationpage from './pages/add_location/add_location_page';
import Startfundingpage from './pages/start_funding/start_funding_page';
import Hireemployeepage from './pages/hire_employee/hire_employee_page';
import Fireemployeepage from './pages/fire_employee/fire_employee_page';
import Manageservicepage from './pages/manage_service/manage_service_page';
import Takeoverdronepage from './pages/takeover_drone/takeover_drone_page';
import Joinswarmpage from './pages/join_swarm/join_swarm_page';
import Leaveswarmpage from './pages/leave_swarm/leave_swarm_page';
import Loaddronepage from './pages/load_drone/load_drone_page';
import Refueldronepage from './pages/refuel_drone/refuel_drone_page';
import Flydronepage from './pages/fly_drone/fly_drone_page';
import Purchaseingredientpage from './pages/purchase_ingredient/purchase_ingredient_page';
import Removeingredientpage from './pages/remove_ingredient/remove_ingredient_page';
import Removedronepage from './pages/remove_drone/remove_drone_page';
import Removepilotrolepage from './pages/remove_pilot_role/remove_pilot_role_page';

// imports for view
import Displayownerviewpage from './pages/display_owner_view/display_owner_view_page';
import Displayemployeeviewpage from './pages/display_employee_view/display_employee_view_page';
import Displaypilotviewpage from './pages/display_pilot_view/display_pilot_view_page';
import Displaylocationviewpage from './pages/display_location_view/display_location_view_page';
import Displayingredientviewpage from './pages/display_ingredient_view/display_ingredient_view_page';
import Displayserviceviewpage from './pages/display_service_view/display_service_view_page';

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

          {/* Routes for procedures */}
          <Route path="/" element={<ProcedurePage />} />
          <Route path="/ViewPage" element={<ViewPage />} />
          <Route path="/add_owner" element={<Addownerpage />} />
          <Route path="/add_employee" element={<Addemployeepage />} />
          <Route path="/add_pilot_role" element={<Addpilotrolepage />} />
          <Route path="/add_worker_role" element={<Addworkerrolepage />} />
          <Route path="/add_ingredient" element={<Addingredientpage />} />
          <Route path="/add_drone" element={<Adddronepage />} />
          <Route path="/add_restaurant" element={<Addrestaurantpage />} />
          <Route path="/add_service" element={<Addservicepage />} />
          <Route path="/add_location" element={<Addlocationpage />} />
          <Route path="/start_funding" element={<Startfundingpage />} />
          <Route path="/hire_employee" element={<Hireemployeepage />} />
          <Route path="/fire_employee" element={<Fireemployeepage />} />
          <Route path="/manage_service" element={<Manageservicepage />} />
          <Route path="/takeover_drone" element={<Takeoverdronepage />} />
          <Route path="/join_swarm" element={<Joinswarmpage />} />
          <Route path="/leave_swarm" element={<Leaveswarmpage />} />
          <Route path="/load_drone" element={<Loaddronepage />} />
          <Route path="/refuel_drone" element={<Refueldronepage />} />
          <Route path="/fly_drone" element={<Flydronepage />} />
          <Route path="/purchase_ingredient" element={<Purchaseingredientpage />} />
          <Route path="/remove_ingredient" element={<Removeingredientpage />} />
          <Route path="/remove_drone" element={<Removedronepage />} />
          <Route path="/remove_pilot_role" element={<Removepilotrolepage />} />
          

          {/* Routes for views */}
          <Route path="/ViewPage/display_owner_view" element={<Displayownerviewpage />} />
          <Route path="/ViewPage/display_employee_view" element={<Displayemployeeviewpage />} />
          <Route path="/ViewPage/display_pilot_view" element={<Displaypilotviewpage />} />
          <Route path="/ViewPage/display_location_view" element={<Displaylocationviewpage />} />
          <Route path="/ViewPage/display_ingredient_view" element={<Displayingredientviewpage />} />
          <Route path="/ViewPage/display_service_view" element={<Displayserviceviewpage />} />


        </Routes>
      </div>
    </Router>
  );
}

