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
import { getAllUser, getWorkLogUser, deleteWorkLog } from '../services/services';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import ModalDelete from '../components/ModalDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBriefcase } from '@fortawesome/free-solid-svg-icons';

const WorkLog = () => {
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pages, setPages] = useState([]);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState();
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const isLoggedIn = user?.token !== undefined;

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (pages.includes(page+1)) {
      return;
    }

    fetchWorklog();
  }, [page, rowsPerPage]);

  const fetchWorklog = async () => {
    try {
      setLoading(true);
      const res = await getAllUser(user?.token, rowsPerPage, page + 1); 
      if (res.data.data) {
        setData((prevData) => [...prevData, ...res.data.data.users]);
        setPages((prevPages) => [...prevPages, page + 1]);
        setTotalData(res.data.data.total);
      }else{
        setData([]);
        setPages([]);
        setTotalData(0);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
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
        <div className="text-2xl">All Users</div>
      </div>
      <>
        {!loading ? (
          <>
            <TableContainer>
              <Table>
                <TableHead className="bg-gray-200">
                  <TableRow>
                    <TableCell align="center">No</TableCell>
                    <TableCell align="center">UID</TableCell>
                    <TableCell align="center">Email</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.length > 0 ? (
                    data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.email}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">
                          <button className="bg-blue-700 px-3 py-1.5 rounded-full text-white hover:bg-blue-500" onClick={() => navigate(`/worklog/user/${row.id}`)}>Report</button>
                        </TableCell>
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
        ) : (
          <div>Loading ...</div>
        )}
      </>
      <ModalDelete open={openModal} onClose={handleClose} onConfirm={() => handleConfirm(selectedId)} name={selectedName} id={selectedId} />
    </Paper>
  );
};


export default WorkLog;