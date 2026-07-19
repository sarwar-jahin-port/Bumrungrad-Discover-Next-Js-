"use client";

import { Divider } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
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
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslations } from "next-intl";

const SOCIAL_LINKS = {
    facebook: "https://www.facebook.com/discoverbangladeshbd",
    youtube: "https://www.youtube.com/@discoverbangladesh",
    whatsapp: "https://wa.me/+66948283651",
};

const Topbar = () => {
    const { auth, setAuth, setIsAdd } = useAuth();
    const t = useTranslations("nav");
    const tHeader = useTranslations("header");
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
            } else {
                toast.error("Logout Failed");
            }

        }
    };

    const renderChildDropdown = (mi, columnLayout) => (
        <ul
            className={`ml-2 p-2 rounded bg-white shadow-xl hidden group-hover:block absolute top-full z-30 min-w-[260px] ${columnLayout ? "left-0" : ""}`}
        >
            {mi.childs?.map((mc, ci) => (
                <Link
                    key={ci}
                    href={mc?.link ? mc.link : "#"}
                    className='flex items-center gap-2'
                >
                    <div className='h-2 w-2 shrink-0 rounded-full bg-blue'></div>
                    <p className='hover:ml-1 my-1 duration-300 ease-linear'>
                        {t(mc.name)}
                    </p>
                </Link>
            ))}
        </ul>
    );

    const renderMegaMenu = (mi) => (
        <div
            /* Increased max-w-[720px] to max-w-[950px] */
            className='p-4 md:p-6 bg-white shadow-xl rounded hidden group-hover:grid absolute top-full left-0 z-30 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-[85vw] max-w-[850px]'
            role='menu'
        >
            {mi.megaColumns.map((col, colIdx) => (
                <div key={colIdx}>
                    {/* Kept whitespace-nowrap */}
                    <p className='font-bold text-sm uppercase text-blue/70 mb-2 whitespace-nowrap'>
                        {t(col.title)}
                    </p>
                    <ul className='flex flex-col gap-1'>
                        {col.items.map((it, itIdx) => (
                            <Link
                                key={itIdx}
                                href={it.link}
                                className='flex items-center gap-2'
                            >
                                <div className='h-2 w-2 shrink-0 rounded-full bg-blue'></div>
                                {/* Kept whitespace-nowrap */}
                                <p className='hover:ml-1 duration-300 ease-linear whitespace-nowrap'>
                                    {t(it.name)}
                                </p>
                            </Link>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );

    return (
        <nav className='bg-cream z-50 sticky top-0 shadow-sm'>
            <Toaster />
            {/* Row 1: Logo + Utility Bar (doc §1.1) */}
            <section className='px-3 py-3 relative md:container md:mx-auto flex items-center justify-between gap-4'>
                <Link href={"/"} className='shrink-0'>
                    <Image
                        src={logo}
                        alt='Bumrungrad International Hospital'
                        className='w-[140px] md:w-[180px]'
                        width={200}
                        height={200}
                        priority
                    />
                </Link>

                <div className='flex gap-3 items-center'>
                    <div className='hidden md:block'>
                        <LanguageSwitcher />
                    </div>
                    <div className='hidden sm:flex gap-3 items-center'>
                        <a
                            href={SOCIAL_LINKS.facebook}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='Facebook'
                        >
                            <FacebookIcon
                                sx={{ fontSize: "24px" }}
                                className='cursor-pointer text-blue hover:scale-110 duration-300 ease-linear'
                            />
                        </a>
                        <a
                            href={SOCIAL_LINKS.youtube}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='YouTube'
                        >
                            <YouTubeIcon
                                sx={{ fontSize: "24px" }}
                                className='cursor-pointer text-blue hover:scale-110 duration-300 ease-linear'
                            />
                        </a>
                        <a
                            href={SOCIAL_LINKS.whatsapp}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label='WhatsApp'
                        >
                            <WhatsAppIcon
                                sx={{ fontSize: "24px" }}
                                className='cursor-pointer text-blue hover:scale-110 duration-300 ease-linear'
                            />
                        </a>
                        <a href='mailto:support@discoverinternationalmedicalservice.com' aria-label='Email'>
                            <EmailIcon
                                sx={{ fontSize: "24px" }}
                                className='cursor-pointer text-blue hover:scale-110 duration-300 ease-linear'
                            />
                        </a>
                    </div>
                    <button
                        onClick={() => setAppointmentOpen(true)}
                        className='bg-blue text-white hover:opacity-90 duration-300 ease-linear rounded-full px-3 py-2 md:px-4 flex items-center gap-1.5 text-sm font-semibold whitespace-nowrap focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-blue'
                        aria-label={tHeader("bookAppointment")}
                    >
                        <CalendarMonthIcon sx={{ fontSize: "20px" }} />
                        <span className='hidden sm:inline'>{tHeader("bookAppointment")}</span>
                    </button>
                    {/* Navbar Button  */}
                    <button
                        className='md:hidden z-50 shrink-0'
                        onClick={() => setOpen(!open)}
                        aria-label={tHeader("toggleMenu")}
                        aria-expanded={open}
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
            </section>

            {/* Row 2: Primary Nav (doc §1.2), tablet + desktop */}
            <section className='hidden md:block border-t border-blue/10'>
                <div className='px-3 md:container md:mx-auto py-2.5'>
                    <ul className='flex flex-wrap justify-center gap-x-5 gap-y-2 text-[14px] lg:text-[15px] text-blue'>
                        {menuItems.map((mi, i) => (
                            <li key={i} className='group relative'>
                                <Link
                                    className='font-semibold whitespace-nowrap'
                                    href={mi?.link ? mi.link : "#"}
                                >
                                    {t(mi.header)}
                                </Link>
                                {mi.childs && renderChildDropdown(mi)}
                                {mi.megaColumns && renderMegaMenu(mi)}
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* Mobile drawer  */}
            <div className='min-w-full fixed top-16 left-0 md:hidden z-30 max-h-[calc(100vh-4rem)] overflow-y-auto'>
                {open && (
                    <ul className='min-h-fit backdrop-blur-xl bg-white/95 px-8 py-2.5 flex flex-col gap-4 text-[16px] text-blue border-t-2 border-blue'>
                        <li className='list-none pb-2'>
                            <LanguageSwitcher />
                        </li>
                        {menuItems.map((mi, i) => (
                            <React.Fragment key={i}>
                                <li className='relative list-none'>
                                    <Link
                                        href={mi?.link ? mi.link : "#"}
                                        className='flex font-semibold justify-between items-center rounded'
                                        onClick={(e) => {
                                            if (mi.childs || mi.megaColumns) {
                                                // Items with a submenu toggle it instead of navigating,
                                                // even when they also have their own href (e.g. Our Services).
                                                e.preventDefault();
                                                handleDropdown(i);
                                            } else {
                                                setOpen(false); // close the menu for items without children
                                            }
                                        }}
                                    >
                                        {t(mi.header)}
                                        {(mi.childs || mi.megaColumns) && (
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
                                            <ul className='p-1'>
                                                {mi.childs?.map((mc, ci) => (
                                                    <Link
                                                        key={ci}
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
                                                            {t(mc.name)}
                                                        </p>
                                                    </Link>
                                                ))}
                                            </ul>
                                        )}

                                    {mi.megaColumns &&
                                        dropdownOpen.index === i &&
                                        dropdownOpen.status && (
                                            <div className='p-1 flex flex-col gap-4'>
                                                {mi.megaColumns.map((col, colIdx) => (
                                                    <div key={colIdx}>
                                                        <p className='font-bold text-sm uppercase text-blue/70 mb-1'>
                                                            {t(col.title)}
                                                        </p>
                                                        <ul>
                                                            {col.items.map((it, itIdx) => (
                                                                <Link
                                                                    key={itIdx}
                                                                    href={it.link}
                                                                    className='flex items-center gap-2'
                                                                    onClick={() => setOpen(false)}
                                                                >
                                                                    <div className='h-2 w-2 rounded-full bg-blue'></div>
                                                                    <p className='hover:ml-3 my-1 duration-300 ease-linear'>
                                                                        {t(it.name)}
                                                                    </p>
                                                                </Link>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                </li>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </ul>
                )}
            </div>
            <BookAppointmentModal
                open={appointmentOpen}
                onClose={() => setAppointmentOpen(false)}
            />
        </nav>
    );
};

export default Topbar;
