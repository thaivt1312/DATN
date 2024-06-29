import { Stack, Button } from '@mui/material'
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { onMessageListener } from "../../firebase";

const ACTIVE_SUCCESS = 'Active device successfully!'
export default function SideBar() {

    const [notiList, setNotiList] = useState(localStorage.getItem('notiList') ? JSON.parse(localStorage.getItem('notiList')) : [])

    const clearNotiList = () => {
        setNotiList([])
        localStorage.removeItem('notiList')
    }

    useEffect(() => {
        onMessageListener().then(payload => {
            // setNotification({title: payload.notification.title, body: payload.notification.body})
            // setShow(true);
            console.log(payload)
            // if (payload?.data?.data === ACTIVE_SUCCESS) {
            //     return;
            // }
            let arr = [...notiList]
            // arr.push(payload?.data?.data)
            arr.unshift(payload?.data?.data)
            setNotiList([...arr])
            localStorage.setItem('notiList', JSON.stringify(arr))
            toast(payload?.data?.data)
        }).catch(err => console.log('failed: ', err));

    })

    return (

        <Stack sx={{ width: '20vw', padding: '20px', background: '#3C3B3B', color: 'white', }} spacing={2}>
            <Button onClick={clearNotiList}
                sx={{ 
                    border: 'solid 1px', 
                    background: '#1976d2', 
                    color: 'white', 
                    borderRadius: '8px', 
                    '&:hover': {
                        opacity: 0.9,
                        background: '#1976d2',
                    },
                    fontWeight: 600,
                }} 
            >
                Clear notifications list
            </Button>
            <Stack spacing={1}>
            {
                notiList.map((noti) => {
                    return (
                        <>
                            <Stack sx={{
                                border: 'solid 1px',
                                borderRadius: '8px',
                                padding: '8px',
                                '&:hover': {
                                    background: '#2A2928',
                                }
                            }}>
                                {noti}
                            </Stack>
                        </>
                    )
                })
            }
            </Stack>
        </Stack>
    )
}