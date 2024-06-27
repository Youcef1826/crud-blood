import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableHead from '@mui/material/TableHead';
import TableRow from "@mui/material/TableRow";
import TablePaginationActions from "../TablePaginationActions";
import { useNavigate } from "react-router-dom";

function DonorsList() {
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState("");
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {

    const fetchDonors = async () => {
      try {
        const res = await axios.get("http://localhost:3000/donors");
        setDonors(res.data);
      } catch (error) {
        console.error("Error fetching data :", error);
        setError("Failed to fetch donors !");
      };
    };

    fetchDonors();
  }, []);


  const editDonor = (id) => {
    navigate(`/edit-donor/${id}`);
  };


  const deleteDonor = async (id) => {
    try {
        await axios.delete(`http://localhost:3000/donors/${id}`);
        setDonors(donors.filter(donor => donor._id !== id));
    } catch (error) {
        console.error('Error deleting donor:', error);
    };
  };


  const handleEditDonor = (donor) => {
    setSelectedDonor(donor);
  };

  const handleUpdateDonor = (updatedDonor) => {
    setDonors(
      donors.map((donor) =>
        donor._id === updatedDonor._id ? updatedDonor : donor
      )
    );
    setSelectedDonor(null);
  };

  const handleCancelEdit = () => {
    setSelectedDonor(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (error) {
    return <p>{error}</p>;
  }


  return (

    <section>
        <h2 className="text-red-900 py-8 pl-3 bg-red-50 font-bold text-2xl">List of donors</h2>
    <TableContainer className="my-12" component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
      <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Blood Group</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Donation date</TableCell>
            <TableCell align="right">Birthdate</TableCell>
            <TableCell align="right">Health</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? donors.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : donors
          ).map((donor) => (
            <React.Fragment key={donor._id}>
              {selectedDonor && selectedDonor._id === donor._id ? (
                <TableRow>
                  <TableCell colSpan={3}>
                    <EditDonorForm
                      donor={selectedDonor}
                      onUpdate={handleUpdateDonor}
                      onCancel={handleCancelEdit}
                    />
                  </TableCell>
                </TableRow>
              ) : (
                <TableRow key={donor._id}>
                  <TableCell component="th" scope="row">
                    {donor.name}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {donor.bloodGroup}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {donor.city}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {new Date(donor.donationDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {new Date(donor.birthDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {donor.health}
                  </TableCell>
                  <TableCell align="right">
                    <button className="text-blue-800 mr-3" onClick={() => editDonor(donor._id)}>Edit</button>
                    <button className="text-red-800" onClick={() => deleteDonor(donor._id)}>Delete</button>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={7}
              count={donors.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </section>
  );
}

export default DonorsList;