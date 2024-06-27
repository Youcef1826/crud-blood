import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditDonor() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [donor, setDonor] = useState({
    name: "",
    bloodGroup: "",
    city: "",
    donationDate: "",
    birthDate: "",
    health: ""
  });


  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/donors/${id}`);
        setDonor(res.data);
      } catch (error) {
        console.error('Error fetching donor data:', error);
      }
    };

    fetchDonor();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonor({...donor, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/donors/${id}`, donor);
      navigate('/donors');
    } catch (error) {
      console.error('Error updating donor data:', error);
    }
  };


  return (
    <section>
        <form className='space-y-3 w-96' onSubmit={handleSubmit}>
            <div>
                <label className='block'>Name</label>
                <input className='border-2 border-slate-200 p-2 rounded-md'
                type="text"
                name="name"
                value={donor.name}
                onChange={handleChange}
                />
            </div>
            <div>
                <label className='block'>Blood Group</label>
                <input className='border-2 border-slate-200 p-2 rounded-md'
                type="text"
                name="bloodGroup"
                value={donor.bloodGroup}
                onChange={handleChange}
                />
            </div>
            <div>
                <label className='block'>City</label>
                <input className='border-2 border-slate-200 p-2 rounded-md'
                type="text"
                name="city"
                value={donor.city}
                onChange={handleChange}
                />
            </div>
            <div>
                <label className='block'>Donation Date</label>
                <input className='border-2 border-slate-200 p-2 rounded-md'
                type="date"
                name="donationDate"
                value={donor.donationDate}
                onChange={handleChange}
                />
            </div>
            <div>
                <label className='block'>Birth Date</label>
                <input className='border-2 border-slate-200 p-2 rounded-md'
                type="date"
                name="birthDate"
                value={donor.birthDate}
                onChange={handleChange}
                />
            </div>
            <div>
                <label className='block'>Health</label>
                <input className='border-2 border-slate-200 p-2 rounded-md'
                type="text"
                name="health"
                value={donor.health}
                onChange={handleChange}
                />
            </div>
            <button className="bg-blue-500 py-2 px-4 text-white rounded-md mt-5" type="submit">Update</button>
        </form>
    </section>
  );
}

export default EditDonor;