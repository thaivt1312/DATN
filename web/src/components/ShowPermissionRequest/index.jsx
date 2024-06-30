import { Box, Modal, Typography, Stack, Button } from "@mui/material";

export default function PermissionRequestModal({
    open,
    close,
}) {

    return (
        <Modal open={open}>
            <Box sx={{
                position: 'relative',
                width: '80%',
                height: '80%',
                left: '10%',
                top: '10%',
                background: 'white',
                borderRadius: '8px',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '40px',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                <Typography variant='h2' textAlign={"center"} sx={{ color: 'red' }}>
                    Please allow notification permission
                </Typography>
                <Stack direction={"row"} spacing={1}>
                    <img width={'50%'} src="/noti_permission_request.png" alt="Request permission"/>

                    <img width={'50%'} src="/noti_request.png" alt="Request permission"/>
                </Stack>
                <Typography variant='caption' textAlign={"center"}>
                    Example in Google Edge Browser (select Allow)
                </Typography>


                <Button onClick={() => window.location.reload()}>
                    Refresh
                </Button>
            </Box>
        </Modal>
    )
}