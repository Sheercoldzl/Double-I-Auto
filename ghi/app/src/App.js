import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import TechnicianForm from './Service/TechnicianForm';
import ServiceAppointmentForm from './Service/ServiceAppointmentForm';
import SalesForm from './Sales/SalesForm';
import SalesList from './Sales/SalesList';
import SalesPersonForm from './Sales/SalesPersonForm';
import CustomerForm from './Sales/CustomerForm';
import SalesHistory from './Sales/SalesHistory';
import ManufacturerList from './Inventory/ManufacturerList';
import AutomobileList from './Inventory/AutomobileList';
import ManufacturerForm from './Inventory/ManufacturerForm';
import VehicleModelForm from './Inventory/VehicleModelForm';
import AutomobileForm from './Inventory/AutomobileForm';
import ServiceAppointmentList from './Service/ServiceAppointmentList';
import ServiceHistory from './Service/ServiceHistory';
import VehicleModelsList from './Inventory/VehicleModelsList';
import EmployeesList from './Employees';


function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="employee/">
            <Route path="list/" element={<EmployeesList />} />
            <Route path="technician/" element={<TechnicianForm />} />
            <Route path="salesperson/" element={<SalesPersonForm />} />
          </Route>
          <Route path="sales/">
            <Route path="create/" element={<SalesForm />} />
            <Route path="list/" element={<SalesList />} />
            <Route path="history/" element={<SalesHistory />} />
          </Route>
          <Route path="models/">
            <Route path="list/" element={<VehicleModelsList />} />
            <Route path="create/" element={<VehicleModelForm />} />
          </Route>
          <Route path="manufacturers/">
            <Route path="list/" element={<ManufacturerList />} />
            <Route path="create/" element={<ManufacturerForm />} />
          </Route>
          <Route path="inventory/">
            <Route path="list/" element={<AutomobileList />} />
            <Route path="create/" element={<AutomobileForm />} />
          </Route>
          <Route path="appointments/">
            <Route path="list/" element={<ServiceAppointmentList />} />
            <Route path="history/" element={<ServiceHistory />} />
            <Route path="create/" element={<ServiceAppointmentForm />} />
          </Route>
          <Route path="customers/create/" element={<CustomerForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
