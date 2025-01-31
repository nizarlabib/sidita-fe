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
import { getAllWorkLog, getWorkLogUser, deleteWorkLog, getWorkLogByUserId, getUserDataById, getTotalUserHoursWorkedByProject, getAbsenRecapByUserId } from '../services/services';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import ModalDelete from '../components/ModalDelete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const WorkLog = () => {
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pages, setPages] = useState([]);
  const [data, setData] = useState([]);
  const [totalData, setTotalData] = useState();
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [totalUserHoursWorkedByProject, setTotalUserHoursWorkedByProject] = useState();
  const [absenRecap, setAbsenRecap] = useState([]);
  const [allMonths, setAllMonths] = useState();
  const [loadingRecap, setLoadingRecap] = useState(true);


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

  useEffect(() => {
    setLoading(true);
    fetchUser();
    fetchTotalUserHoursWorkedByProject();
    fetchAbsenRecap();
    setLoading(false);
  }, [id]);

  const fetchAbsenRecap = async () => {
    try {
      const res = await getAbsenRecapByUserId(user?.token, id);
      setAbsenRecap(res.data.data);
      const am = Array.from(
        new Set(
          Object.keys(res.data.data.recaps_per_month)
        )
      ).sort();
      setAllMonths(am);
    } catch (err) {
      console.error(err);
    } 
    setLoadingRecap(false);
  };

  const fetchTotalUserHoursWorkedByProject = async () => {
    try {
      const res = await getTotalUserHoursWorkedByProject(user?.token, id);
      if (res.data.data) {
        setTotalUserHoursWorkedByProject(res.data.data);
      }else{
        setTotalUserHoursWorkedByProject(0);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await getUserDataById(user?.token, id);
      if (res.data.data) {
        setUserData(res.data.data);
      }else{
        setUserData(null);
        toast.error('User not found');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchWorklog = async () => {
    try {
      setLoading(true);
      const res = await getWorkLogByUserId(user?.token, id, rowsPerPage, page + 1); 
      if (res.data.data) {
        setData((prevData) => [...prevData, ...res.data.data.worklogs]);
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
        <button
          onClick={() => navigate("/")}
          className="flex items-center px-2 py-1.5 text-sm font-medium text-white bg-gray-500 rounded h-max hover:bg-gray-600"
        >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-1 w-4 h-4" />
          Back
        </button>
        <div className="text-2xl text-center mb-3">{userData?.email}</div>
        <div></div>
      </div>
      <div className="text-2xl text-gray-500 text-center">Recap Absent Per Month</div>
      <>
        {!loading ? (
        <>
          {
              !loadingRecap ? (
                <div className="mb-12">
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center"></TableCell>
                          <TableCell className="bg-gray-200" align="center">Work</TableCell>
                          <TableCell className="bg-gray-200" align="center">Absent</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {absenRecap ? (
                          <>
                          {allMonths.map(month => (
                            <TableRow>
                              <TableCell className="bg-gray-200" align="center">{month}</TableCell>
                              <TableCell align="center">{absenRecap.recaps_per_month[month].total_days_worked}/{absenRecap.recaps_per_month[month].total_days_in_month}<br/> ({absenRecap.recaps_per_month[month].days_worked_percent}%)</TableCell>
                              <TableCell align="center">{absenRecap.recaps_per_month[month].total_absent_days}</TableCell>
                            </TableRow>
                            ))}
                          </>
                        ) : (
                          <TableRow>
                            <TableCell align="center" colSpan={6}>
                              No data available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                      <TableHead>
                        <TableRow>
                          <TableCell align="center">Total</TableCell>
                          <TableCell align="center">{absenRecap?.total_days_worked} Days</TableCell>
                          <TableCell align="center">{absenRecap?.total_absent_days} Days</TableCell>
                        </TableRow>
                      </TableHead>
                    </Table>
                  </TableContainer>
                </div> 
              ) : <div>Loading ...</div>
          }
            <div className="mb-12">
                <div className="text-2xl text-gray-500 text-center">Recap Hours And Days Worked Per Project</div>
                <TableContainer>
                  <Table>
                      <TableHead className="bg-gray-200">
                        <TableRow>
                            <TableCell align="center">No</TableCell>
                            <TableCell align="center">Project</TableCell>
                            <TableCell align="center">Total Hours Worked</TableCell>
                            <TableCell align="center">Total Days Worked</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                      {totalUserHoursWorkedByProject && totalUserHoursWorkedByProject.length > 0 ? (
                          totalUserHoursWorkedByProject.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                          <TableRow key={row.id}>
                              <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                              <TableCell align="center">{row.project_name}</TableCell>
                              <TableCell align="center">{row.hours_worked}</TableCell>
                              <TableCell align="center">{row.total_work_days}</TableCell>
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
            </div>
            <>
                <div className="flex justify-between">
                  <div></div>
                  <div className="text-2xl text-gray-500 text-center">WorkLogs</div>
                  <button
                    onClick={() => navigate(`/worklog/add/${userData?.id}`)}
                    className="flex items-center px-2 py-1.5 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600 h-max"
                  >
                    <AddIcon className="mr-1 w-2 h-2" />
                    ADD
                  </button>
                </div>
                <TableContainer>
                <Table>
                    <TableHead className="bg-gray-200">
                    <TableRow>
                        <TableCell align="center">No</TableCell>
                        <TableCell align="center">Work Date</TableCell>
                        <TableCell align="center">Project Name</TableCell>
                        <TableCell align="center">Location</TableCell>
                        <TableCell align="center">Hours Worked</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.length > 0 ? (
                        data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                        <TableRow key={row.id}>
                            <TableCell align="center">{page * rowsPerPage + index + 1}</TableCell>
                            <TableCell align="center">{dayjs(row.work_date).format('YYYY-MM-DD')}</TableCell>
                            <TableCell align="center">{row.project.name}</TableCell>
                            <TableCell align="center">{row.project.location}</TableCell>
                            <TableCell align="center">{row.hours_worked}</TableCell>
                            <TableCell align="center">
                            <IconButton
                                onClick={() => handleOpen(row.id, row.name)}
                            >
                                <DeleteIcon />
                            </IconButton>
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