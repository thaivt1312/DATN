import { Button, Stack, TextField, Typography, useMediaQuery } from '@mui/material'

import { useFormik } from 'formik'
import * as Yup from 'yup';

import UserService from '../services/UserService';

import { toast } from 'react-toastify';

export default function LoginPage({

}) {
    
    const small = useMediaQuery("(max-width:600px)");
    const full = useMediaQuery("(min-width:600px)");

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            rePassword: '',
        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .max(45)
                .required(),
            password: Yup
                .string()
                .max(45)
                .required(),
            rePassword: Yup
                .string()
                .max(45)
                .required()
        }),
        onSubmit: (values) => {
            if (values.password!== values.rePassword) {
                toast.error('Passwords do not match')
                return
            }
            UserService.register(values)
                .then((r) => {
                    let data = r?.data;
                    if (data?.success) {
                        toast.success(data?.msg)
                        window.location = '/login'
                    } else {
                        toast.error(data?.msg)
                    }
                    console.log(r)
                })
        }
    })
    return (
        <div style={{
            // width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: small ? '20px': '40px'
        }}>
            <Stack>
                <Typography variant='h4' textAlign={"center"}>
                    Register
                </Typography>
            </Stack>
            <Stack spacing={2}
                justifyContent={"center"}
                alignItems={"center"}
                flex={1}
                sx={{
                    border: 'solid 1px #1976d2',
                    borderRadius: '16px',
                    margin: small ? '0': '10% 20%',
                    padding: small ? '10px': '30px',
                }}
            >
                <TextField
                    size='small'
                    fullWidth
                    name="username"
                    label="Username"
                    type="text"
                    onChange={formik.handleChange}
                    error={!!(formik.touched.username && formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                />

                <TextField
                    size='small'
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    onChange={formik.handleChange}
                    error={!!(formik.touched.password && formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />

                <TextField
                    size='small'
                    fullWidth
                    name="rePassword"
                    label="Re-type Password"
                    type="password"
                    onChange={formik.handleChange}
                    error={!!(formik.touched.rePassword && formik.errors.rePassword)}
                    helperText={formik.touched.rePassword && formik.errors.rePassword}
                />

                <Button onClick={formik.handleSubmit}
                    fullWidth
                    sx={{
                        // border: 'solid 1px',
                        background: '#1976d2',
                        color: 'white',
                        '&:hover': {
                            opacity: 0.7,
                            background: '#1976d2',
                        }
                    }}
                >
                    Register
                </Button>

            </Stack>
        </div>
    )
}