import { Stack, TableContainer, Typography, useMediaQuery, Table, TableHead, TableCell, TableBody, TableRow, Button, TextField } from "@mui/material"

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from "react";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";

import { useParams } from 'react-router-dom';
import AppService from "../services/AppService";
import { toast } from "react-toastify";
import ConfirmPopup from "../components/ConfirmPopup";

export default function DetailPage({

}) {
    const { id } = useParams();

    const small = useMediaQuery("(max-width:600px)");
    const full = useMediaQuery("(min-width:600px)");

    const [data, setData] = useState()
    const [date, setDate] = useState(dayjs(new Date()))
    const [fromTime, setFromTime] = useState(dayjs(new Date('2024-05-05T00:00')))
    const [toTime, setToTime] = useState(dayjs(new Date('2024-05-05T23:59')))

    const [userInformation, setUserInformation] = useState('')
    const [editInformations, setEditInformations] = useState(false)
    const [openConfirmDeactive, setOpenConfirmDeactive] = useState()

    function formatDate(date, delimiter = '-') {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join(delimiter);
    }

    function formatTime(date, delimiter = ':') {
        var d = new Date(date),
            hour = d.getHours(),
            minute = d.getMinutes(),
            second = d.getSeconds();

        if (hour < 10)
            hour = '0' + hour;
        if (minute < 10)
            minute = '0' + minute;
        if (second < 10)
            second = '0' + second;

        return [hour, minute, second].join(delimiter);
    }

    const getData = () => {
        const apiParams = {
            id: id,
            from: formatDate(date ? date : new Date()) + ' ' + formatTime(fromTime ? fromTime : new Date('2024-05-05T00:00:00')),
            to: formatDate(date ? date : new Date()) + ' ' + formatTime(toTime ? toTime : new Date('2024-05-05T23:59:59')),
        }
        AppService.getDetail(apiParams)
            .then((res) => {
                console.log(res)
                if (res.data.success) {
                    setData(res.data.data)
                    setUserInformation(res.data.data.user_information)
                } else {
                    toast.error(res.data.msg)
                }
            })
    }

    const handleDeactive = () => {
        AppService.deactiveDevice({
            id,
            deviceId: data?.device_id
        })
            .then((res) => {
                console.log(res)
                let data = res.data
                if (data.success) {
                    toast.success(data.msg)
                    window.location = '/device-list'
                    getData()
                } else {
                    toast.error(data.msg)
                }
            })
    }

    useEffect(() => {
        getData()
    }, [date, fromTime, toTime])

    const handleChangeInformation = () => {
        if (editInformations) {
            AppService.editUserInformation({
                "information": userInformation,
                "id": id,
            })
                .then((res) => {
                    console.log(res)
                    let data = res.data
                    if (data.success) {
                        toast.success(data.msg)
                    } else {
                        toast.error(data.msg)
                    }
                    getData()
                })
        }
        setEditInformations(!editInformations)
    }

    const downloadSoundFile = (datetime) => {
        let date = formatDate(datetime, '')
        let time = formatTime(datetime, '')
        AppService.downloadSoundFile({
            id,
            date,
            time,
        })
            .then((res) => {
                console.log(res)
                let data = res.data
                const url = window.URL.createObjectURL(new Blob([data], { type: 'audio/wav' }));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `${id}_${date}_${time}.wav`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

            })
            .catch((err) => {
                console.error(err);
                toast.error("File not found")
            })
    }

    return (

        <div style={{
            // width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: small ? '20px' : '40px'
        }}>
            <a href="/device-list">
                Return to device list page
            </a>

            {
                openConfirmDeactive ?
                    <ConfirmPopup
                        title={"Deactive this device"}
                        content={"Do you want to deactive this device?"}
                        open={openConfirmDeactive}
                        close={() => setOpenConfirmDeactive(false)}
                        handleConfirm={handleDeactive}
                    />
                    : <></>
            }
            <Stack spacing={4}>
                <Typography variant='h4' textAlign={"center"}>
                    Device detail
                </Typography>

                <Stack spacing={1}>
                    <Stack direction={"row"} justifyContent={"space-between"}>
                        <Typography variant="h6">
                            Information
                        </Typography>
                        {
                            data ?
                                <Button onClick={() => setOpenConfirmDeactive(true)}>
                                    Deactive this device
                                </Button>
                                : <></>
                        }
                    </Stack>

                    <Typography variant="span">
                        Device ID: {data?.device_id}
                    </Typography>

                    <Typography variant="span">
                        Device information: {data?.device_information}
                    </Typography>

                    <Stack direction={"row"} spacing={2}>
                        <Typography variant="span">
                            User information:
                        </Typography>
                        <TextField
                            variant="standard"
                            size="small"
                            value={userInformation}
                            onChange={(e) => setUserInformation(e.target.value)}
                            disabled={!editInformations}
                        />
                        {/* {data?.user_information} */}
                        <Button onClick={handleChangeInformation}>
                            {
                                editInformations ? "Save" : "Edit"
                            }
                        </Button>

                    </Stack>

                </Stack>


                <Stack spacing={1}>
                    <Typography variant="h6">
                        Predictions:
                    </Typography>
                    <Stack spacing={1} direction={"row"} alignItems={"center"}>
                        <Stack direction={"row"} flex={1} spacing={2} alignItems={"center"}>
                            <Typography>
                                Date:
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    // label="Controlled picker"
                                    value={date}
                                    onChange={(newValue) => setDate(newValue)}
                                />
                            </LocalizationProvider>
                        </Stack>

                        <Stack direction={"row"} flex={1} spacing={2} alignItems={"center"}>
                            <Typography>
                                Time:
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <TimePicker
                                    ampm={false}
                                    label="From time"
                                    value={fromTime}
                                    onChange={(newValue) => setFromTime(newValue)}
                                />
                            </LocalizationProvider>
                            <Typography>
                                to:
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>

                                <TimePicker
                                    ampm={false}
                                    label="To time"
                                    value={toTime}
                                    onChange={(newValue) => setToTime(newValue)}
                                />
                            </LocalizationProvider>
                        </Stack>
                    </Stack>

                </Stack>

                <Stack flex={1}>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ textTransform: 'uppercase', 'th': { fontWeight: 600 } }}>
                                <TableRow>
                                    <TableCell>
                                        Prediction
                                    </TableCell>
                                    <TableCell>
                                        Location
                                    </TableCell>
                                    <TableCell>
                                        Time
                                    </TableCell>
                                    <TableCell>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    data?.predictions?.map(prediction => {
                                        return (
                                            <TableRow key={prediction.id}>
                                                <TableCell>
                                                    {prediction.prediction}
                                                </TableCell>
                                                <TableCell>
                                                {
                                                    prediction.latitude || prediction.longitude ?
                                                    <a href={`https://www.google.com/maps?q=${prediction.latitude},${prediction.longitude}`}>
                                                        Click to open in Map
                                                    </a>
                                                    : 'Cannot get location'
                                                }
                                                </TableCell>
                                                <TableCell>
                                                    {prediction.time}
                                                </TableCell>
                                                <TableCell>
                                                    <Button onClick={() => downloadSoundFile(prediction.time)}>Download sound file</Button>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Stack>
        </div>
    )
}