
// Importing files from Material-UI
import { useState } from "react";
import { AppBar, Toolbar, Typography, Button, useMediaQuery, styled, Stack } from "@mui/material"

import { ExpandMoreOutlined, ExpandLessOutlined, Menu as MenuIcon } from "@mui/icons-material"

// import MenuIcon from "@mui/icons-material/Menu";

// import ExpandLess from "@mui/icons-material/ExpandLess";
// import ExpandMore from "@mui/icons-material/ExpandMore";

// Using Inline Styling
const useStyles = styled((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
}));

// Exporting Default Navbar to the App.js File
export default function Navbar() {

    let user_token = typeof window !== 'undefined' && (window.localStorage.getItem("data") && window.localStorage.getItem("data") !== 'null')
        ? JSON.parse(window.localStorage.getItem("data")).user_token
        : "";
    let admin_token = typeof window !== 'undefined' && (window.localStorage.getItem("data") && window.localStorage.getItem("data") !== 'null')
        ? JSON.parse(window.localStorage.getItem("data")).admin_token
        : "";

    const logout = () => {
        window.localStorage.clear();
        window.location.href = "/";
    }

    return (
        <div style={{ width: '100%', maxHeight: '20vh', fontWeight: 600 }}>
            <AppBar position="static">
                <Stack direction={"row"} justifyContent={"space-between"} >
                    <Stack direction={"row"} spacing={2}>
                        <Typography
                            variant="h5"
                            color="inherit"
                            sx={{ padding: '20px' }}
                        >
                            Smartwatch monitor
                        </Typography>
                        <Button color="inherit" sx={{fontWeight: 600}}>
                            <a href="/account-list" style={{color: 'white'}}>
                                Account
                            </a>
                        </Button>

                        <Button color="inherit" sx={{fontWeight: 600}}>
                            <a href="/device-list" style={{color: 'white'}}>
                                Devices
                            </a>
                        </Button>

                    </Stack>
                    {
                        (user_token || admin_token) ?
                            <Stack sx={{ padding: '20px' }}>
                                <Button color="inherit" sx={{fontWeight: 600}} onClick={logout}>
                                    Logout
                                </Button>

                            </Stack>
                            : <></>
                    }
                </Stack>
            </AppBar>
        </div>
    );
}