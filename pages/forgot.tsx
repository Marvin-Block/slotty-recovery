import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import NavBar from "../components/landing/NavBar";

import HCaptcha from "@hcaptcha/react-hcaptcha";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Head from "next/head";
import LoadingButton from "../components/misc/LoadingButton";
import { makeXTrack } from "../src/getIPAddress";

export default function Login() {
    const router = useRouter();
    const captchaRef: any = useRef();

    const [captchaToken, setCaptchaToken] = useState("");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [openS, setOpenS] = useState(false);
    const [openE, setOpenE] = useState(false);
    const [notiTextS, setNotiTextS] = useState("X");
    const [notiTextE, setNotiTextE] = useState("X");

    const token: any = router.query.token;

    const onExpire = () => {
        setNotiTextE("Captcha expired");
        setOpenE(true);
    }

    const onError = (err: any) => {
        setNotiTextE(err);
        setOpenE(true);
    }

    const onReset = async (e: any) => {
        e.preventDefault();
        
        await axios.post("/api/v2/auth/forgot?token=" + token, {
            newPassword: newPassword,
        }, {
            headers: {
                "x-track": makeXTrack(),
            },
            validateStatus: () => true 
        }).then(res => {
            if (res.status === 200) {
                setNotiTextS(res.data.message);
                setOpenS(true);
                router.push("/login");
            } else {
                setNotiTextE(res.data.message);
                setOpenE(true);
            }
        }).catch(err => {
            setNotiTextE(err);
            setOpenE(true);
        });
    }
    
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        switch (name) {
        case "email":
            setEmail(value);
            break;
        case "newPassword":
            setNewPassword(value);
            break;
        default:
            break;
        }
    }

    useEffect(() => {
        try {
            if (captchaToken) {
                fetch(`/api/v2/auth/forgot`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "x-track": makeXTrack()
                    },
                    body: JSON.stringify({
                        login: email,
                        captcha: captchaToken,
                    })
                })
                    .then(res => {
                        // check if res.status is 204
                        if (res.status === 204) {
                            setNotiTextS("Check your email for a link to reset your password");
                            setOpenS(true);
                        } else {
                            setNotiTextE("Invalid email or captcha");
                            setOpenE(true);
                        }
                    })
                    .catch(err => {
                        setNotiTextE(err.message);
                        setOpenE(true);
                    });
            }
        }
        catch (err) {
            console.error(err);
        }
    }, [email, router, captchaToken]);

    return (
        <>
            <Box sx={{ minHeight: "100vh", flexDirection: "column", display: "flex", pt: "2.5rem" }}>
                <Head>
                    <meta name="description" content="SlottyRecovery is a Recovery Service, it can Backup and Restore your Servers Members, Channels, Categories, Roles and much more" />
                    <meta property="og:description" content="SlottyRecovery is a Recovery Service, it can Backup and Restore your Servers Members, Channels, Categories, Roles and do much more" />
                    <meta property="og:title" content="SlottyRecovery - Login" />
                </Head>

                <Container maxWidth="lg" sx={{ mx: "auto", justifyContent: "center", alignItems: "center" }}>

                    <NavBar />

                    <Snackbar open={openE} autoHideDuration={3000} onClose={(event?: React.SyntheticEvent | Event, reason?: string) => { if (reason === "clickaway") { return; } setOpenE(false); }} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                        <Alert elevation={6} variant="filled" severity="error">
                            {notiTextE}
                        </Alert>
                    </Snackbar>

                    <Snackbar open={openS} autoHideDuration={3000} onClose={(event?: React.SyntheticEvent | Event, reason?: string) => { if (reason === "clickaway") { return; } setOpenS(false); }} anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                        <Alert elevation={6} variant="filled" severity="success">
                            {notiTextS}
                        </Alert>
                    </Snackbar>

                    <Box sx={{ width: "100%", maxWidth: "500px", mx: "auto", mt: "3rem" }}>
                        <Typography variant="h4" component="h1" align="center" sx={{ fontWeight: "bold" }} gutterBottom>
                            Forgot Password
                        </Typography>

                        
                        {token ? (
                            <form onSubmit={onReset}>
                                <Box sx={{ width: "100%", maxWidth: "500px", mx: "auto", mt: "3rem" }}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="newPassword"
                                        label="New Password"
                                        name="newPassword"
                                        placeholder="••••••••••••"
                                        autoComplete="password"
                                        type="password"
                                        InputProps={{ inputProps: { minLength: 6, maxLength: 45 } }}
                                        autoFocus
                                        value={newPassword}
                                        onChange={handleChange}
                                    />
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        sx={{ mt: "2rem", mb: "0.5rem" }}
                                    >
                                        Change Password
                                    </Button>
                                    <Grid container>
                                        <Grid item xs>
                                            <Link href="/login">
                                                {/* <MuiLink variant="body2" component="a" href="/login"> */}
                                                    Remember Password?
                                                {/* </MuiLink> */}
                                            </Link>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </form>
                        ) : (
                            <Box sx={{ width: "100%", maxWidth: "500px", mx: "auto", mt: "3rem" }}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    placeholder="Email"
                                    autoComplete="email"
                                    InputProps={{ inputProps: { minLength: 6, maxLength: 50 } }}
                                    autoFocus
                                    value={email}
                                    onChange={handleChange}
                                />
                                <HCaptcha
                                    sitekey="2df678fc-a3b4-4c06-a000-3480e558211a"
                                    size="invisible"
                                    theme="dark"
                                    onVerify={setCaptchaToken}
                                    onError={onError}
                                    onExpire={onExpire}
                                    ref={captchaRef}
                                />
                                <LoadingButton
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: "2rem", mb: "0.5rem", width: "100%" }}
                                    event={() => captchaRef.current.execute()}
                                >
                                    Send Password Reset Link
                                </LoadingButton>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="/login">
                                            {/* <MuiLink variant="body2" component="a" href="/login"> */}
                                                    Remember Password?
                                            {/* </MuiLink> */}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Box>
                </Container>
            </Box>
        </>
    )
}