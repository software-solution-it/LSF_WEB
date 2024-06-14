import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './screens/welcome/welcome';
import Login from './screens/login/login';
import Home from './screens/home/home';
import Inauguration from './screens/inauguration/inauguration';
import StepInauguration from './screens/steps/inauguration/inauguration';
import Geolocation from './screens/steps/geolocalization/geolocalization';
import Inauguration_3 from './screens/steps/inauguration_3/inauguration_3';
import Inauguration_4 from './screens/steps/inauguration_4/inauguration_4';
import Inauguration_2 from './screens/steps/inauguration_2/inauguration_2';
import Inauguration_5 from './screens/steps/inauguration_5/inauguration_5';
import Inauguration_6 from './screens/steps/inauguration_6/inauguration_6';
import Supplier from './screens/steps/supplier/supplier';
import Supplier_Board from './screens/steps/supplier_board/supplier_board';
import Supplier_Product from './screens/steps/supplier_product/supplier_product';
import Supplier_Payment from './screens/steps/supplier_payment/supplier_payment';
import Supplier_Technician from './screens/steps/supplier_technician/supplier_technician';
import Laundry_Inauguration from './screens/steps/laundry_inauguration/laundry_inauguration';
import Supplier_Document from './screens/steps/supplier_document/supplier_document';
import Waiting_Aproval from './screens/steps/waiting_aproval/waiting_aproval';
import Electric from './screens/steps/electric/electric';
import Reset from './screens/reset_pass/reset_pass';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Inauguration />} />
        <Route path="/step/geolocalization" element={<Geolocation />} />
        <Route path="/step/electric" element={<Electric />} />
        <Route path="/step/project" element={<StepInauguration />} />
        <Route path="/step/dimension" element={<Inauguration_2 />} />
        <Route path="/step/quantity" element={<Inauguration_3 />} />
        <Route path="/step/set" element={<Inauguration_4 />} />
        <Route path="/step/aquisition" element={<Inauguration_6 />} />
        <Route path="/step/supplier" element={<Supplier />} />
        <Route path="/step/board" element={<Supplier_Board />} />
        <Route path="/step/product" element={<Supplier_Product />} />
        <Route path="/step/payment" element={<Supplier_Payment />} />
        <Route path="/step/technician" element={<Supplier_Technician />} />
        <Route path="/step/laundry_inauguration" element={<Laundry_Inauguration />} />
        <Route path="/step/supplier_document" element={<Supplier_Document />} />
        <Route path="/step/waiting_aproval" element={<Waiting_Aproval />} />
      </Routes>
    </Router>
  );
}

export default App;
