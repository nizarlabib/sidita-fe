import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, Button, Select, InputLabel, FormControl, FormHelperText, Paper, Autocomplete } from '@mui/material';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { addWorkLog, getAllProject, getUserDataById } from '../services/services'; 
import dayjs from 'dayjs';
import toast from 'react-hot-toast';

const AddWorkLog = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.value);
  const isLoggedIn = user?.token !== undefined;
  const [projects, setProjects] = useState([]);
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(!isLoggedIn){
      navigate('/login');
      return;
    }
    getAllProject(user?.token).then(res => {
      setProjects(res.data.data);
    });
  }, []);

  useEffect(() => {
    getUserData();
    setLoading(false);
  }, [id]);

  const getUserData = async () => {
    try {
      const response = await getUserDataById(user?.token, id);
      setUserData(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleOnChangeWorkDate = (date) => {
    formik.setFieldValue('work_date', dayjs(date).format('YYYY-MM-DD'));
  };

  const formik = useFormik({
    initialValues: {
      project_id: '',
      hours_worked: '',
      work_date: dayjs(new Date()).format('YYYY-MM-DD'),
    },
    validationSchema: Yup.object({
        project_id: Yup.string().required('Project is required'),
        hours_worked: Yup.string().required('Hours Worked is required')
        .test('max', 'Invalid hours worked', (value) => {
            return value >= 0 && value <= 8;
        }),
        work_date: Yup.string().required('Work Date is required'),
    }),
    onSubmit: async (values) => {
        values.user_id = userData?.id;
        values.email = userData?.email;
        try {
            const response = await addWorkLog(values, user?.token);
            if(response.data.data){
                toast.success('Worklog added successfully');
                navigate(`/worklog/user/${userData?.id}`);
            }else{
                toast.error(response.data.message)
              }
        } catch (error) {
            toast.error(error.response.data.message)
            console.error(error.response.data.message);
        }
    },
  });

  return (
    <Paper className="shadow-md p-8">
        <div className="p-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-6">Add WorkLog</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
        <form onSubmit={formik.handleSubmit}>
            {/* UID */}
            <input type="hidden" name="user_id" value={userData?.id} />
            {/* Email */}
            <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                value={userData?.email}
                InputLabelProps={{
                    shrink: Boolean({...formik.getFieldProps('max_price')}),
                }}
                disabled
            />
            {
                projects.length > 0 && (
                    <>
                        {/* Project */}
                        <FormControl fullWidth margin="normal" error={formik.touched.project_id && Boolean(formik.errors.project_id)}>
                            <InputLabel>Project</InputLabel>
                            <Select
                                label="Project"
                                {...formik.getFieldProps('project_id')}
                            >
                                {projects.map((project) => (
                                <MenuItem key={project.id} value={project.id}>
                                    {project.name} - {project.location}
                                </MenuItem>
                                ))}
                            </Select>
                            {formik.touched.project_id && formik.errors.project_id && (
                                <FormHelperText>{formik.errors.project_id}</FormHelperText>
                            )}
                        </FormControl>
                    </>
                )
            }
            
            {/* Hours Worked */}
            <TextField
            fullWidth
            label="Hours Worked"
            variant="outlined"
            margin="normal"
            type="number"
            {...formik.getFieldProps('hours_worked')}
            error={formik.touched.hours_worked && Boolean(formik.errors.hours_worked)}
            helperText={formik.touched.hours_worked && formik.errors.hours_worked}
            />
            <div className="mt-4 mb-3">
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DateTimePicker
                        fullWidth 
                        label="Work Date"
                        variant="outlined"
                        margin="normal"
                        defaultValue={dayjs(new Date())}
                        format="YYYY-MM-DD"
                        onChange={handleOnChangeWorkDate}
                        className="w-full"
                    />
                </LocalizationProvider>
            </div>

            <div className="flex gap-2 mt-6">
                {/* Cancel Button */}
                <Button type="button" variant="outlined" onClick={() => navigate(`/worklog/user/${id}`)} color="primary" fullWidth>
                    Cancel
                </Button>
                {/* Submit Button */}
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    ADD
                </Button>
            </div>
        </form>
        )}
        </div>
    </Paper>
  );
};

export default AddWorkLog;
