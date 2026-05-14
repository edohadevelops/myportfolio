import * as routes from '../../../routes/routes';
import { GoHome } from "react-icons/go";
import { BsBriefcase } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { IoLayersOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleMinus } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { GrHomeRounded } from "react-icons/gr";

export const ADMINLINKS = [
    {
        name: "Dashboard",
        url: routes.ADMINHOME,
        hasSublinks: false,
        icon: GoHome,
        activeIcon: GoHome,
        id: routes.ADMINHOME,
        sublinks: []
    },
    {
        name: "Projects",
        url: routes.ADMINPROJECTS,
        hasSublinks: true,
        icon: BsBriefcase,
        activeIcon: BsBriefcase,
        id: routes.ADMINPROJECTS,
        sublinks: []
    },
    {
        name: "Categories",
        url: routes.ADMINCATEGORIES,
        hasSublinks: true,
        icon: BiCategoryAlt,
        activeIcon: BiCategoryAlt,
        id: routes.ADMINCATEGORIES,
        sublinks: []
    },
    {
        name: "Stack",
        url: routes.ADMINSTACKS,
        hasSublinks: true,
        icon: IoLayersOutline,
        activeIcon: IoLayersOutline,
        id: routes.ADMINSTACKS,
        sublinks: []
    },
    {
        name: "Profile",
        url: routes.ADMINPROFILE,
        hasSublinks: false,
        icon: CgProfile,
        activeIcon: CgProfile,
        id: routes.ADMINPROFILE,
        sublinks: []
    },
    
]

export const ADMINCONTROLS = [
    {
        name: "Settings",
        url: routes.ADMINSETTINGS,
        hasSublinks: false,
        icon: IoSettingsOutline,
        activeIcon: IoSettingsOutline,
        id: routes.ADMINSETTINGS,
        sublinks: []
    },
    {
        name: "Log out",
        url: routes.LOGIN,
        hasSublinks: true,
        icon: CiCircleMinus,
        activeIcon: CiCircleMinus,
        id: routes.ADMINSETTINGS,
        sublinks: []
    },
]