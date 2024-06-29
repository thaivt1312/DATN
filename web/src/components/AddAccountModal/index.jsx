import { Box, Modal, Typography, Stack, Button, useMediaQuery, TextField, RadioGroup, Radio, FormControl, FormControlLabel, FormLabel } from "@mui/material";
import { useFormik } from 'formik'
import * as Yup from 'yup';


export default function AddAccountModal({
    open,
    close,
    handleAddAccount,
}) {

    const small = useMediaQuery("(max-width:600px)");
    const full = useMediaQuery("(min-width:600px)");

    const formik = useFormik({
        initialValues: {
            accountType: 0,
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
            handleAddAccount(values)
        }
    })

    return (
        <Modal open={open} onClose={close}>
            <Box sx={{
                position: 'relative',
                width: '60%',
                height: '60%',
                left: '20%',
                top: '20%',
                background: 'white',
                borderRadius: '8px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
            }}>
                <Stack>
                    <Typography variant='h4' textAlign={"center"}>
                        Add new account
                    </Typography>
                </Stack>
                <Stack spacing={2}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flex={1}
                    sx={{
                        padding: small ? '10px' : '30px',
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

                    <FormControl sx={{width: '100%', flexDirection: 'row', gap: '20px', alignItems: 'center'}}>
                        <FormLabel id="demo-radio-buttons-group-label">Account type:</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            value={formik.values.accountType}
                            onChange={(e) => formik.setFieldValue('accountType', e.target.value)}
                        >
                            <FormControlLabel value={0} control={<Radio />} label="User" />
                            <FormControlLabel value={1} control={<Radio />} label="Admin" />
                        </RadioGroup>
                    </FormControl>

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
                        Submit
                    </Button>

                    <Stack sx={{ width: '100%' }} direction={"row"} justifyContent={"flex-end"}>
                        <Button onClick={close}>
                            Close
                        </Button>
                    </Stack>
                </Stack>

            </Box>
        </Modal>
    )
}