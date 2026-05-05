"use client";

import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import logo from "@/public/assets/Bumrungrad  Hospital_nav_logo.png";
import { menuItems } from "./menuItems";
import { useRouter } from "next/navigation";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import useAuth from "@/helpers/hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import BookAppointmentModal from "@/components/shared/BookAppointmentModal";

const Topbar = () => {
    const { auth, setAuth, setIsAdd } = useAuth();
    const [open, setOpen] = useState(false);
    const [appointmentOpen, setAppointmentOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState({
        status: false,
        index: "",
    });
    const handleDropdown = (id) => {
        setDropdownOpen({
            status: !dropdownOpen.status,
            index: id,
        });
    };
    // Function to handle scroll event
    const handleScroll = () => {
        setOpen(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navigate = useRouter();

    //sign out user
    const handleSingnOut = async () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("Access_Token");
            localStorage.removeItem("User_Details");
            setIsAdd(false);
            setAuth(null);

            const response = await fetch("/api/auth/logout");

            const data = await response.json();

            if (data.success) {
                toast.success("Logout Successful");
                navigate.push("/");
            }else{
                toast.error("Logout Failed");
            }

        }
    };
    return (
        <nav className='bg-cream z-50'>
          <Toaster />
            <section className='px-3 py-3 relative md:container md:mx-auto flex items-center justify-between'>
                <Link href={"/"}>
                    <Image
                        src={logo}
                        alt='Bumrungrad International Hospital'
                        className='w-[200px]'
                        width={200}
                        height={200}
                    />
                </Link>
                {/* Mobile View  */}
                <div className='min-w-full fixed top-16 left-0 md:hidden z-30'>
                    {open && (
                        <ul className='min-h-fit backdrop-blur-xl bg-white/30 px-8 py-2.5 flex flex-col gap-4 md:gap-8 text-[16px] text-blue border-t-2 md:border-t-4 border-blue'>
                            {menuItems.map((mi, i) => (
                                <>
                                    <li key={i} className='relative'>
                                        <Link
                                            href={mi?.link ? mi.link : "#"}
                                            className='flex font-semibold justify-between items-center rounded'
                                            onClick={() => {
                                                if (mi.childs) {
                                                    handleDropdown(i); // toggle dropdown for items with children
                                                } else {
                                                    setOpen(false); // close the menu for items without children
                                                }
                                            }}
                                        >
                                            {mi.header}
                                            {mi.childs && (
                                                <>
                                                    {dropdownOpen.status &&
                                                    dropdownOpen.index === i ? (
                                                        <ExpandLessIcon
                                                            sx={{
                                                                fontSize:
                                                                    "24px",
                                                            }}
                                                        />
                                                    ) : (
                                                        <ExpandMoreIcon
                                                            sx={{
                                                                fontSize:
                                                                    "24px",
                                                            }}
                                                        />
                                                    )}
                                                </>
                                            )}
                                        </Link>

                                        {mi.childs &&
                                            dropdownOpen.index === i &&
                                            dropdownOpen.status && (
                                                <ul className='p-1 md:p-2'>
                                                    {mi.childs?.map((mc, i) => (
                                                        <Link
                                                            key={i}
                                                            href={
                                                                mc?.link
                                                                    ? mc.link
                                                                    : "#"
                                                            }
                                                            className='flex items-center gap-2'
                                                            onClick={() =>
                                                                setOpen(false)
                                                            }
                                                        >
                                                            <div className='h-2 w-2 rounded-full bg-blue'></div>
                                                            <p className='hover:ml-3 my-1 duration-300 ease-linear'>
                                                                {mc.name}
                                                            </p>
                                                        </Link>
                                                    ))}
                                                </ul>
                                            )}
                                    </li>
                                    <Divider />
                                </>
                            ))}
                        </ul>
                    )}
                </div>
                {/* Desktop View  */}
                <div className='hidden py-3 lg:block'>
                    <ul className='flex justify-center gap-5 text-[16px] text-blue'>
                        {menuItems.map((mi, i) => (
                            <li key={i} className='group relative'>
                                <Link
                                    className='font-semibold'
                                    href={mi?.link ? mi.link : "#"}
                                >
                                    {mi.header}
                                </Link>
                                {mi.childs && (
                                    <ul className='ml-2 p-2 rounded bg-white shadow-xl hidden group-hover:block absolute top-6 min-w-[300px] z-30'>
                                        {mi.childs?.map((mc, i) => (
                                            <Link
                                                key={i}
                                                href={mc?.link ? mc.link : "#"}
                                                className='flex items-center gap-2'
                                            >
                                                <div className='h-2 bg-blue w-2 rounded-full'></div>
                                                <p className='hover:ml-3 my-1 duration-300 ease-linear'>
                                                    {mc.name}
                                                </p>
                                            </Link>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* link and button  */}
                <div className='flex gap-4'>
                    {/*
                    Sign In / Profile dropdown — temporarily hidden, replaced with Book an Appointment.
                    <div className='relative group hidden md:block'>
                        <PersonIcon
                            sx={{ fontSize: "28px" }}
                            className='text-blue cursor-pointer'
                        />
                        <div className='hidden group-hover:block duration-300 ease-linear bg-white absolute z-50 min-w-[120px] md:min-w-[150px] rounded shadow-xl'>
                            <div className='flex flex-col p-2 rounded gap-2 text-sm'>
                                {auth ? (
                                    <>
                                        <Link
                                            href={"/my-profile"}
                                            className='hover:text-blue font-semibold p-1 rounded duration-300 ease-linear flex items-center gap-2.5'
                                        >
                                            <PersonIcon
                                                sx={{ fontSize: "24px" }}
                                                className='text-blue cursor-pointer'
                                            />{" "}
                                            <span>Profile</span>
                                        </Link>
                                        <button
                                            onClick={handleSingnOut}
                                            className='hover:text-blue font-semibold p-1 rounded duration-300 ease-linear flex items-center gap-2.5'
                                        >
                                            <LogoutIcon className='text-blue' />{" "}
                                            <span>Sign Out</span>
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href={"/login"}
                                        className='hover:text-blue font-semibold p-1 rounded duration-300 ease-linear flex items-center gap-2.5'
                                    >
                                        <LoginIcon /> <span>Sign In</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                    */}
                    <button
                        onClick={() => setAppointmentOpen(true)}
                        className='text-blue hover:scale-110 duration-300 ease-linear'
                        aria-label='Book an Appointment'
                        title='Book an Appointment'
                    >
                        <CalendarMonthIcon sx={{ fontSize: "28px" }} />
                    </button>
                    <div className='flex gap-4 items-center'>
                        <a href='mailto:support@discoverinternationalmedicalservice.com'>
                            <EmailIcon
                                sx={{ fontSize: "28px" }}
                                className='cursor-pointer text-blue'
                            />
                        </a>
                        {/* Navbar Button  */}
                        <button
                            className='md:hidden z-50'
                            onClick={() => setOpen(!open)}
                        >
                            {open ? (
                                <CloseIcon
                                    sx={{ fontSize: "28px" }}
                                    className='cursor-pointer text-blue'
                                />
                            ) : (
                                <MenuIcon
                                    sx={{ fontSize: "28px" }}
                                    className='cursor-pointer text-blue'
                                />
                            )}
                        </button>
                    </div>
                </div>
            </section>
            {/* Tablet View  */}
            <section className='hidden px-5 py-3 md:block lg:hidden md:container md:mx-auto'>
                <ul className='flex flex-wrap gap-8 text-[16px] text-blue'>
                    {menuItems.map((mi, i) => (
                        <li key={i} className='group relative'>
                            <Link
                                href={mi?.link ? mi.link : "#"}
                                className='font-semibold'
                            >
                                {mi.header}
                            </Link>
                            {mi.childs && (
                                <ul className='ml-2 p-2 rounded bg-white shadow-xl hidden group-hover:block absolute top-6 min-w-[300px] z-30'>
                                    {mi.childs?.map((mc, i) => (
                                        <Link
                                            key={i}
                                            href={mc.link ? mc.link : "#"}
                                            className='flex items-center gap-2'
                                        >
                                            <div className='h-2 bg-blue w-2 rounded-full'></div>
                                            <p className='hover:ml-3 my-1 duration-300 ease-linear'>
                                                {mc.name}
                                            </p>
                                        </Link>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
            <Divider />
            <BookAppointmentModal
                open={appointmentOpen}
                onClose={() => setAppointmentOpen(false)}
            />
        </nav>
    );
};

export default Topbar;
