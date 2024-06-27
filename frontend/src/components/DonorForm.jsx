import React, { useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function DonorForm() {

    const [donor, setDonor] = useState({
        name: "",
        bloodGroup: "",
        donationDate: "",
        city: "",
        birthDate: "",
        health: ""
    });

    const navigate = useNavigate();

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { name, bloodGroup, donationDate, city, birthDate, health } = donor;

    const submitNewDonor = async (e) => {
        e.preventDefault();

        if (!name || !bloodGroup || !donationDate || !city || !birthDate || !health) {
            setError("All fields are required!");
            return;
        };

        const newDonor = { name, bloodGroup, donationDate, city, birthDate, health };

        try {
            const response = await axios.post("http://localhost:3000/donors", newDonor);
            navigate("/donors");

        } catch (error) {
            setError("Failed to add donor: " + error.message);
            setSuccess("");
        };
    };

    return (
        <form className="my-12" onSubmit={submitNewDonor}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    maxWidth: 500,
                    '& > *': {
                        mt: 2,
                    },
                }}
            >
                <TextField
                    fullWidth
                    label="Name"
                    id="name"
                    value={name}
                    onChange={(e) => setDonor({ ...donor, name: e.target.value })}
                    required
                />
                <TextField
                    fullWidth
                    label="Blood Group"
                    id="bloodGroup"
                    value={bloodGroup}
                    onChange={(e) => setDonor({ ...donor, bloodGroup: e.target.value })}
                    required
                />
                <TextField
                    fullWidth
                    type="date"
                    label="Donation Date"
                    id="donationDate"
                    value={donationDate}
                    onChange={(e) => setDonor({ ...donor, donationDate: e.target.value })}
                    required
                />
                <TextField
                    fullWidth
                    label="City"
                    id="city"
                    value={city}
                    onChange={(e) => setDonor({ ...donor, city: e.target.value })}
                    required
                />
                <TextField
                    fullWidth
                    type="date"
                    label="Birth Date"
                    id="birthDate"
                    value={birthDate}
                    onChange={(e) => setDonor({ ...donor, birthDate: e.target.value })}
                    required
                />
                <TextField
                    fullWidth
                    label="Health"
                    id="health"
                    value={health}
                    onChange={(e) => setDonor({ ...donor, health: e.target.value })}
                    required
                />
                <Stack spacing={2} direction="row">
                    <Button variant="contained" type="submit">Add donor</Button>
                </Stack>

                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
            </Box>
        </form>
    );
};
export default DonorForm;