import logo from './logo.svg';
import './App.css';
import CustomNavbar from './navbar'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Route, Routes, Router, Switch, BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Home from './home';
import AboutUs from './aboutus'
import ContactUs from './contactus'
import Login from './login'
import SignUp from './signup'
import Navbar from './navbar';
import Footer from './footer'
import NotFound from './notfound'
import Protected from './protected';
import Admin from './admin'
import Traveler from './Traveler'
import TourDetails from './TourDetails'
import TravelAgent from './travelagent'
import Booking from './booking'
import Payment from './payment'
import Gallery from './gallery';
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    <div className="App">
      <Navbar />
      <ToastContainer></ToastContainer>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/TourDetails" element={<TourDetails />} />
          <Route path="/Booking" element={<Booking />} />
          <Route path="/Payment" element={<Payment />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/Traveler' element={<Protected Component={Traveler} />} />
          <Route path='/TravelAgent' element={<Protected Component={TravelAgent} />} />
          <Route path='/Admin' element={<Protected Component={Admin} />} />
        </Routes>
      

      <Footer />
    </div>
  );
}

export default App;
