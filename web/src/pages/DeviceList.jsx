import { Stack, TableContainer, Typography, useMediaQuery, Table, TableHead, TableCell, TableBody, TableRow, Button } from "@mui/material"
import { useEffect, useState } from "react";
import AddDeviceModal from "../components/AddDeviceModal";
import AppService from "../services/AppService";

import { onMessageListener } from "../firebase";

const ACTIVE_SUCCESS = 'Active device successfully!'

export default function DeviceListPage({

}) {

    const small = useMediaQuery("(max-width:600px)");
    const full = useMediaQuery("(min-width:600px)");

    const [list, setList] = useState([])

    const [openAddModal, setOpenAddModal] = useState(false)

    useEffect(() => {
        // fetch data from api or local storage
        // setList(data)
        AppService.getDeviceList()
        .then((r) =>{
            console.log(r);
            setList(r.data?.data);
        })
    }, [])

    onMessageListener().then(payload => {
        // setNotification({title: payload.notification.title, body: payload.notification.body})
        // setShow(true);
        console.log(payload)
        if (payload?.data?.data === ACTIVE_SUCCESS) {
            toast.success(ACTIVE_SUCCESS)
            setOpenAddModal(false);
        }
    }).catch(err => console.log('failed: ', err));

    return (
        <div style={{
            // width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: small ? '20px' : '50px'
        }}>
            <Stack spacing={2}>
                <Typography variant='h4' textAlign={"center"}>
                    Devices list
                </Typography>
                {
                    openAddModal &&
                    <AddDeviceModal
                        open={openAddModal}
                        close={() => setOpenAddModal(false)}
                    />
                }

                <Stack direction={"row"} justifyContent={"flex-end"} sx={{width: '100%'}}>
                    <Button onClick={() => setOpenAddModal(true)}>
                        Add new device
                    </Button>
                </Stack>

                <Stack flex={1}>
                    <TableContainer>
                        <Table>
                            <TableHead sx={{ textTransform: 'uppercase', 'th': { fontWeight: 600 } }}>
                                <TableRow>
                                    <TableCell>
                                        ID
                                    </TableCell>
                                    <TableCell>
                                        Device ID
                                    </TableCell>
                                    <TableCell>
                                        User information
                                    </TableCell>
                                    <TableCell>
                                        Status
                                    </TableCell>
                                    <TableCell>
                                        Last prediction
                                    </TableCell>
                                    <TableCell>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    list.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {item.user_id}
                                            </TableCell>
                                            <TableCell>
                                                {item.device_id}
                                            </TableCell>
                                            <TableCell>
                                                {item.user_information}
                                            </TableCell>
                                            <TableCell>
                                            {
                                                item.is_running ? 'Running'
                                                : item.is_active ? 'Not running'
                                                : 'Not active'
                                            }
                                            </TableCell>
                                            <TableCell>
                                                {item.last_predict}
                                            </TableCell>
                                            <TableCell>
                                                <Button>
                                                    <a href={`/detail/${item.user_id}`}>
                                                        Detail
                                                    </a>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                                {/* <TableRow>

                                    <TableCell>
                                        1
                                    </TableCell>
                                    <TableCell>
                                        123456
                                    </TableCell>
                                    <TableCell>
                                        DuckT
                                    </TableCell>
                                    <TableCell>
                                        Is running
                                    </TableCell>
                                    <TableCell>
                                        No danger
                                    </TableCell>
                                    <TableCell>

                                        <Button>
                                            <a href="/detail/1">
                                                Detail
                                            </a>
                                        </Button>
                                    </TableCell>
                                </TableRow>

                                <TableRow>



                                    <TableCell>
                                        2
                                    </TableCell>
                                    <TableCell>
                                        646f7d3b6ae430fe
                                    </TableCell>
                                    <TableCell>

                                    </TableCell>
                                    <TableCell>     
                                        Not running
                                    </TableCell>
                                    <TableCell>

                                    </TableCell>
                                    <TableCell>

                                        <Button>
                                            <a href="/detail/1">
                                                Detail
                                            </a>
                                        </Button>
                                    </TableCell>
                                </TableRow> */}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Stack>
        </div>
    )
}