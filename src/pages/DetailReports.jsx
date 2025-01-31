import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { getAllWorkLog, getWorkLogUser, deleteWorkLog, getAllProject, getProjectById } from '../services/services';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const WorkLog = () => {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState()
  const { id } = useParams();

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

  const fetchProject = async () => {
    try {
      const res = await getProjectById(user?.token, id);
      setProject(res.data.data);
    } catch (err) {
      console.error(err);
    } 
    setLoading(false);
  };

  return (
    <Paper className="shadow-md p-8">
      <div className="flex justify-between pb-6">
        <div className="text-2xl">Recaps</div>
        <div className="text-2xl text-gray-500 text-center">{project?.name} - {project?.location}</div>
      </div>
      {/* <>
        {!loading ? (
          <>
            <TableContainer>
              <Table>
                <TableHead className="bg-gray-200">
                  <TableRow>
                    <TableCell align="center">No</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Location</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projects.length > 0 ? (
                    projects.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                      <TableRow key={row.id}>
                        <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.location}</TableCell>
                        <TableCell align="center">
                          <button className="bg-blue-700 px-3 py-1.5 rounded-full text-white hover:bg-blue-500" onClick={() => navigate(`/worklog/user/${row.id}`)}>Details</button>
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
      </> */}
    </Paper>
  );
};


export default WorkLog;