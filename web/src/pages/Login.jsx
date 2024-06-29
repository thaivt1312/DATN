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
            password: ''
        },
        validationSchema: Yup.object({
            username: Yup
                .string()
                .max(45)
                .required(),
            password: Yup
                .string()
                .max(45)
                .required()
        }),
        onSubmit: (values) => {
            let apiParams =
            {
                ...values,
                firebaseToken: localStorage.getItem('firebaseToken'),
            }
            UserService.login(apiParams)
                .then((r) => {
                    let data = r?.data;
                    if (data?.success) {
                        toast.success(data?.msg)
                        if (typeof window != 'undefined')
                            window.localStorage.setItem('data',
                                JSON.stringify({
                                    ...data?.data,
                                    loginTime: Date.now(),
                                })
                            );
                        window.location.reload()
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
                    Log in
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
                    Log in
                </Button>

                <Stack direction={"row"} justifyContent={"flex-end"} sx={{ width: '100%' }}>
                    <a href='/register'>
                        Register
                    </a>
                </Stack>

            </Stack>
        </div>
    )
}