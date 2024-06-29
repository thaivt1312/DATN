import { Box, Modal, Typography, Stack, Button } from "@mui/material";
import { useEffect, useState } from "react";

import { toast } from 'react-toastify';
import AppService from "../../services/AppService";

export default function AddDeviceModal({
    open,
    close
}) {
    const [passcode, setPasscode] = useState('')

    const generatePasscode = () => {
        AppService.getPasscode()
        .then((r) => {
            console.log(r);
            let data = r?.data
            if (data?.success) {
                setPasscode(data?.passcode)
            } else {
                toast.error(data?.msg)
            }
        })
    }

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
                <Typography variant="h4">
                    Active new device
                </Typography>
                <Stack>
                    <Button onClick={generatePasscode}>
                        {
                            passcode ? 
                            'Regenarate passcode': 
                            'Generate a random passcode'
                        }
                    </Button>
                </Stack>
                <Stack>
                    <Typography variant="h6">
                        Passcode: {passcode}
                    </Typography>

                    <Typography>
                        Enter this passcode to smart watch app to activate the device.
                    </Typography>
                    <Stack sx={{width: '100%'}} alignItems={"center"}>
                        <img src="/active_device_app_design.png" style={{aspectRatio: 1}}  width={'30%'}/>
                    </Stack>
                </Stack>

                <Stack sx={{width: '100%'}} direction={"row"} justifyContent={"flex-end"}>
                    <Button onClick={close}>
                        Close
                    </Button>
                </Stack>
            </Box>
        </Modal>
    )
}