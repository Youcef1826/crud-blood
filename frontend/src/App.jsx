import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/partials/Header';
import DonorsList from './components/DonorsList';
import DonorForm from './components/DonorForm';
import Footer from './components/partials/Footer';
import EditDonor from './components/EditDonor';

function App() {

  return (
    <BrowserRouter>
    <div className='min-h-screen container mx-auto flex flex-col justify-between'>
      <Header />
        <Routes>
          <Route path="/donors" element={<DonorsList />} />
          <Route path="/add-donor" element={<DonorForm />} />
          <Route path="/edit-donor/:id" element={<EditDonor />} />
        </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}
export default App;