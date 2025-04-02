import { ReactElement } from "react";

import AccountBalanceWallet from "@mui/icons-material/AccountBalanceWallet";
import AdminPanelSettings from "@mui/icons-material/AdminPanelSettings";
import Backup from "@mui/icons-material/Backup";
import Code from "@mui/icons-material/Code";
import Dns from "@mui/icons-material/Dns";
import HistoryIcon from "@mui/icons-material/History";
import Home from "@mui/icons-material/Home";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import VerifiedUser from "@mui/icons-material/VerifiedUser";

const navItemWrappers: navItemWrapper[] = [
    {
        name: "Dashboard",
        icon: <Home />,
        href: "/dashboard",
    },
    {
        name: "Servers",
        icon: <Dns />,
        href: "/dashboard/server",
    },
    {
        name: "Migrations",
        icon: <HistoryIcon />,
        href: "/dashboard/migration",
    },
    {
        name: "Backups",
        icon: <Backup />,
        href: "/dashboard/backups",
    },
    {
        name: "Custom Bots",
        icon: <Code />,
        href: "/dashboard/custombots",
    },
    {
        name: "Verified Members",
        icon: <VerifiedUser />,
        href: "/dashboard/members",
    },
    {
        name: "Blacklist",
        icon: <PersonOffIcon />,
        href: "/dashboard/blacklist",
    },
    {
        name: "Admin",
        icon: <AdminPanelSettings />,
        href: "/dashboard/admin",
        admin: true,
    },
    {
        name: "Account",
        icon: <ManageAccountsIcon />,
        href: "/dashboard/account",
    },
    {
        name: "Subscription",
        icon: <AccountBalanceWallet />,
        href: "/dashboard/upgrade",
    },
    // {
    //     name: "Help",
    //     icon: <Help />,
    //     href: "https://community.slotty.cc",
    // },
    // {
    //     name: "Documentation",
    //     icon: <FindInPage />,
    //     href: "https://docs.slotty.cc",
    // }
]

interface navItemWrapper {
    name: string;
    href: string;
    icon: ReactElement;
    admin?: boolean;
}


export default navItemWrappers as navItemWrapper[];
