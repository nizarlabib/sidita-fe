import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import debounce from 'lodash/debounce';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TextField,
  IconButton
} from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllWorkLog, getWorkLogUser, deleteWorkLog, getAllProject, getAbsenRecap } from '../services/services';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import ModalDelete from '../components/ModalDelete';

const Project = () => {
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pages, setPages] = useState([]);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [absenRecap, setAbsenRecap] = useState([]);
  const [allMonths, setAllMonths] = useState();

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const isLoggedIn = user?.token !== undefined;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    fetchProject();
  }, []);

  const fetchAbsenRecap = async () => {
    try {
      const res = await getAbsenRecap(user?.token);
      setAbsenRecap(res.data.data);
      const am = Array.from(
        new Set(
          res.data.data.flatMap(row => Object.keys(row.recaps_per_month))
        )
      ).sort();
      setAllMonths(am);
    } catch (err) {
      console.error(err);
    } 
    setLoading(false);
  };

  const fetchProject = async () => {
    try {
      const res = await getAllProject(user?.token);
      setProjects(res.data.data);
      setTotalData(res.data.data.length);
    } catch (err) {
      console.error(err);
    } 
    setLoading(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedName, setSelectedName] = useState(null);
  const handleOpen = (id, name) => {
    setOpenModal(true);
    setSelectedId(id);
    setSelectedName(name);
  };

  const handleClose = () => setOpenModal(false);

  const handleConfirm = async (id) => {
    setLoading(true);
    try {
      const deleteResponse = await deleteWorkLog(id, user?.token);
      console.log(deleteResponse.data.status);
      if (deleteResponse.data.status === "success") {
        toast.success(`item deleted successfully`);
        setData((prev) => prev.filter((item) => item.id !== id));
        setPages([]);
        setPage(0);
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete worklog. Please try again later.');
    } finally {
      setLoading(false); 
      setOpenModal(false); 
    }
  };

  return (
    <Paper className="shadow-md p-8">
      <div className="flex justify-between pb-6">
        <div className="text-2xl">Project</div>
      </div>
      <>
        {!loading ? (
          <>
            <>
              <TableContainer>
                <Table>
                  <TableHead className="bg-gray-200">
                    <TableRow>
                      <TableCell align="center">No</TableCell>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.length > 0 ? (
                      projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                        <TableRow key={row.id}>
                          <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                          <TableCell align="center">{row.name}</TableCell>
                          <TableCell align="center">{row.location}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell align="center" colSpan={6}>
                          No data available
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={totalData}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
          </>
          
        ) : (
          <div>Loading ...</div>
        )}
      </>
      <ModalDelete open={openModal} onClose={handleClose} onConfirm={() => handleConfirm(selectedId)} name={selectedName} id={selectedId} />
    </Paper>
  );
};


export default Project;