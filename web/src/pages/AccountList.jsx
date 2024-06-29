import { Stack, TableContainer, Typography, useMediaQuery, Table, TableHead, TableCell, TableBody, TableRow, Button } from "@mui/material"
import { useEffect, useState } from "react";
import AdminService from "../services/AdminServices";
import { toast } from "react-toastify";
import AddAccountModal from "../components/AddAccountModal";
import ConfirmPopup from "../components/ConfirmPopup";

export default function AccountListPage({

}) {

    const small = useMediaQuery("(max-width:600px)");
    const full = useMediaQuery("(min-width:600px)");

    const [listAccount, setList] = useState([])
    const [openAddAccount, setOpenAddAccount] = useState(false)
    const [openConfirmDelete, setOpenConfirmDelete] = useState()

    const getList = () => {
        AdminService.getListAccount()
        .then(r => {
            console.log(r);
            let data = r?.data
            if (data.success) {
                setList(data.data);
            } else {
                toast.error(data.msg)
            }
            // let data = r?.data?.data
            // setList(data)
        })

    }

    useEffect(() => {
        getList();
    }, [])

    const handleAddAccount = (data) => {
        
        AdminService.addAccount(data)
        .then((r) => {
            console.log(r)
            let data = r?.data;
            if (data?.success) {
                toast.success(data?.msg)
                getList();
                setOpenAddAccount(false);
            } else {
                toast.error(data?.msg)
            }
        })
    }

    const handleDeleteAccount = () => {
        let username = openConfirmDelete
        AdminService.deleteAccount(username)
        .then((r) => {
            console.log(r)
            let data = r?.data;
            if (data?.success) {
                toast.success(data?.msg)
                getList();
                // setOpenAddAccount(false);
            } else {
                toast.error(data?.msg)
            }
            setOpenConfirmDelete(null);
        })
    }

    return (
        <div style={{
            // width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            padding: small ? '20px' : '50px'
        }}>
            {
                openAddAccount && 
                <AddAccountModal
                    open={openAddAccount}
                    close={()=>setOpenAddAccount(false)}
                    handleAddAccount={handleAddAccount}
                />
            }
            {
                openConfirmDelete ? 
                <ConfirmPopup
                    title={"Delete account"}
                    content={"Do you want to delete this account? This action cannot be undone."}
                    open={openConfirmDelete}
                    close={() => setOpenConfirmDelete(null)}
                    handleConfirm={handleDeleteAccount}
                />
                : <></>
            }
            <Stack spacing={2}>
                <Typography variant='h4' textAlign={"center"}>
                    Account list
                </Typography>
                <Stack direction={"row"} justifyContent={"flex-end"} sx={{width: '100%'}}>
                    <Button onClick={()=>setOpenAddAccount(true)}>
                        Add new account
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
                                        Username
                                    </TableCell>
                                    <TableCell>
                                        Account type
                                    </TableCell>
                                    <TableCell>
                                        Action
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    listAccount.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {index + 1}
                                            </TableCell>
                                            <TableCell>
                                                {item.username}
                                            </TableCell>
                                            <TableCell>
                                                {item.account_type === 0 ? 'User' : "Admin"}
                                            </TableCell>
                                            <TableCell>
                                                <Button onClick={() => setOpenConfirmDelete(item.username)}>
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Stack>
            </Stack>
        </div>
    )
}