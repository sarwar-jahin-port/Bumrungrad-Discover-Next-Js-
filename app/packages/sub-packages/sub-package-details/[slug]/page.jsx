"use client";

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useAuth from "@/helpers/hooks/useAuth";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";
import { useTranslations } from "next-intl";

const ListAccordion = ({ title, items, renderItem, defaultOpen = false }) =>
    items?.length > 0 ? (
        <details className="group border border-ash/20 rounded-lg" open={defaultOpen}>
            <summary className="cursor-pointer list-none flex items-center justify-between p-4 font-semibold text-blue">
                {title}
                <span className="transition-transform group-open:rotate-180">▾</span>
            </summary>
            <ul className="px-4 pb-4 flex flex-col gap-2">
                {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm lg:text-base text-black/80">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue shrink-0" />
                        {renderItem(item)}
                    </li>
                ))}
            </ul>
        </details>
    ) : null;

const ChildPackageDetails = ({ params }) => {
    const t = useTranslations("packagesPages.details");
    const [loader, setLoader] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [postloader, setPostLoader] = useState(false);
    const router = useRouter();
    const { auth } = useAuth();

    const [childDetailsPackage, setChildDetailsPackage] = useState({});

    const [packageName, setPackageName] = useState("");
    const [packagePrice, setPackagePrice] = useState("");
    const [patientName, setPatientName] = useState("");
    const [hnNumber, setHnNumber] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setPhoneEmail] = useState("");
    ///modal function
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
        if (auth) {
            setPatientName(`${auth?.firstName} ${auth?.lastName}` || "");
            setHnNumber(auth?.hnNumber || "");
            setPhoneNumber(auth?.phone || "");
            setPhoneEmail(auth?.email || "");
        }
    }, [auth]);

    const handleClickOpen = (data) => {
        setOpen(true);
        setPackagePrice(data.price);
        setPackageName(data.title);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handalepackageSubmit = async () => {
        const formData = new FormData();
        const fields = {
            packageName,
            packagePrice,
            patientName,
            hnNumber,
            phone: phoneNumber,
            email,
        };

        Object.keys(fields).forEach((key) => formData.append(key, fields[key]));

        setPostLoader(true);
        const response = await fetch(
            "https://api.discoverinternationalmedicalservice.com/api/add/package/booking",
            {
                method: "POST",
                body: formData,
            },
        );
        setPostLoader(false);

        const data = await response.json();

        if (data.status === 200) {
            toast.success(t("successToast"), {
                position: "top-center",
                style: { borderRadius: "20px" },
                duration: 5000,
            });
            router.push("/");
        } else {
            setPostLoader(false);
            toast.error(t("errorToast"));
        }
    };

    //get details data
    useEffect(() => {
        setLoader(true);
        fetch(
            `https://api.discoverinternationalmedicalservice.com/api/get/sub/package/${params.slug}`,
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.status === 200) {
                    setChildDetailsPackage(data?.data);
                } else {
                    setNotFound(true);
                }
                setLoader(false);
            })
            .catch(() => {
                setNotFound(true);
                setLoader(false);
            });
    }, [params.slug]);

    if (loader) {
        return (
            <section className='mx-5 md:container md:mx-auto py-10'>
                <div className='flex flex-col gap-5 lg:flex-row animate-pulse'>
                    <div className='lg:w-1/2 space-y-4'>
                        <div className='h-8 bg-[#DFE2F4]/90 w-3/4 rounded'></div>
                        <div className='mt-5 grid md:grid-cols-2 lg:grid-cols-1 gap-2.5'>
                            <div className='h-6 bg-[#DFE2F4]/90 w-1/2 rounded'></div>
                            <div className='h-6 bg-[#DFE2F4]/90 w-3/4 rounded'></div>
                        </div>
                    </div>
                    <div className='lg:w-1/2'>
                        <div className='w-full max-h-[40vh] bg-[#DFE2F4] rounded h-64'></div>
                        <div className='px-4 my-4 py-2 bg-[#DFE2F4]/90 w-32 h-10 rounded mt-5'></div>
                    </div>
                </div>
            </section>
        );
    }

    if (notFound) {
        return (
            <section className='mx-5 md:container md:mx-auto py-16 text-center'>
                <h1 className="text-xl md:text-2xl font-bold text-blue">{t("notFoundTitle")}</h1>
                <p className="mt-2.5 text-black/50">
                    {t("notFoundText")}
                </p>
            </section>
        );
    }

    return (
        <div>
            <section className='mx-5 md:container md:mx-auto py-10'>
                <div className='flex flex-col gap-8 lg:flex-row-reverse'>
                    <div className='lg:w-1/2'>
                        {childDetailsPackage?.cover_photo ? (
                            <Image
                                height={400}
                                width={400}
                                src={childDetailsPackage.cover_photo}
                                className='w-full max-h-[40vh] object-cover rounded-xl shadow-md'
                                alt='Bumrungrad International Hospital'
                            />
                        ) : (
                            <div className='w-full h-[300px] bg-cream rounded-xl'></div>
                        )}
                        <button
                            onClick={() =>
                                handleClickOpen(childDetailsPackage)
                            }
                            className='px-4 my-4 py-2.5 bg-blue w-fit text-white rounded-lg font-semibold hover:opacity-90 transition-opacity'
                        >
                            {t("bookNow")}
                        </button>
                    </div>
                    <div className='lg:w-1/2 flex flex-col gap-5'>
                        <h1 className='text-[24px] md:text-[28px] font-semibold text-blue'>
                            {childDetailsPackage?.title}
                        </h1>
                        {childDetailsPackage?.id && (
                            <p className='text-sm text-black/60'>
                                {t("packageId", { id: childDetailsPackage.id })}
                            </p>
                        )}
                        {childDetailsPackage?.price && (
                            <p className='text-2xl md:text-3xl font-bold text-blue'>
                                {Number(childDetailsPackage.price).toLocaleString()} THB
                            </p>
                        )}
                        {childDetailsPackage?.location && (
                            <p className='text-base'>
                                <span className='text-blue font-semibold'>{t("locationLabel")}</span>
                                {childDetailsPackage.location}
                            </p>
                        )}
                        {(childDetailsPackage?.shift1 || childDetailsPackage?.shift2) && (
                            <div>
                                <p className='text-blue font-semibold mb-1'>{t("availableShifts")}</p>
                                <ul className='list-disc ml-5'>
                                    {childDetailsPackage?.shift1 && <li>{childDetailsPackage.shift1}</li>}
                                    {childDetailsPackage?.shift2 && <li>{childDetailsPackage.shift2}</li>}
                                </ul>
                            </div>
                        )}

                        <div className="flex flex-col gap-3">
                            <ListAccordion
                                title={t("inclusions")}
                                items={childDetailsPackage?.inclusions}
                                renderItem={(item) => item?.inclusion}
                                defaultOpen
                            />
                            <ListAccordion
                                title={t("exclusions")}
                                items={childDetailsPackage?.exclusions}
                                renderItem={(item) => item?.exclusion}
                            />
                            <ListAccordion
                                title={t("terms")}
                                items={childDetailsPackage?.conditions}
                                renderItem={(item) => item?.condition}
                            />
                        </div>
                    </div>
                </div>
                {childDetailsPackage?.content && (
                    <div className='mt-8'>
                        <div
                            id='blog_desc'
                            dangerouslySetInnerHTML={{
                                __html: childDetailsPackage?.content,
                            }}
                        />
                    </div>
                )}
            </section>
            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                    fullWidth='true'
                >
                    <DialogTitle id='alert-dialog-title'>
                        <div className='flex justify-between relative'>
                            <h1 className='font-semibold'>{t("bookingTitle")}</h1>
                            <button
                                onClick={handleClose}
                                size='small'
                                className='bg-red h-10 w-10 shadow hover:shadow-md flex justify-center absolute top-0 right-0 items-center rounded-full text-white'
                            >
                                <IoMdClose size={20} />
                            </button>
                        </div>
                    </DialogTitle>
                    <DialogContent>
                        <div className='p-4'>
                            <div>
                                <p className='mb-1.5 font-semibold text-blue'>
                                    {t("packageName")}
                                </p>
                                <TextField
                                    id='outlined-basic'
                                    placeholder={t("enterPackageName")}
                                    variant='outlined'
                                    value={packageName}
                                    fullWidth
                                    disabled
                                />
                            </div>
                            <div>
                                <p className='mb-1.5 font-semibold text-blue'>
                                    {t("packagePrice")}
                                </p>
                                <TextField
                                    id='outlined-basic'
                                    type='number'
                                    placeholder={t("enterPackagePrice")}
                                    variant='outlined'
                                    value={packagePrice}
                                    fullWidth
                                    disabled
                                />
                            </div>
                            <div>
                                <p className='my-2.5 font-semibold text-blue'>
                                    {t("patientName")}
                                </p>
                                <TextField
                                    id='outlined-basic'
                                    placeholder={t("enterPatientName")}
                                    variant='outlined'
                                    fullWidth
                                    value={patientName}
                                    onChange={(e) =>
                                        setPatientName(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <p className='my-2.5 font-semibold text-blue'>
                                    {t("hnNumber")}
                                </p>
                                <TextField
                                    id='outlined-basic'
                                    placeholder={t("enterHnNumber")}
                                    variant='outlined'
                                    required
                                    fullWidth
                                    value={hnNumber}
                                    onChange={(e) =>
                                        setHnNumber(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <p className='my-2.5 font-semibold text-blue'>
                                    {t("whatsappNumber")}
                                </p>
                                <TextField
                                    type='text'
                                    required
                                    value={phoneNumber}
                                    id='outlined-basic'
                                    placeholder={t("enterWhatsappNumber")}
                                    variant='outlined'
                                    fullWidth
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <p className='my-2.5 font-semibold text-blue'>
                                    {t("email")}
                                </p>
                                <TextField
                                    required
                                    value={email}
                                    type='email'
                                    id='outlined-basic'
                                    placeholder={t("enterEmail")}
                                    variant='outlined'
                                    fullWidth
                                    onChange={(e) =>
                                        setPhoneEmail(e.target.value)
                                    }
                                />
                            </div>
                            <button
                                disabled={postloader}
                                onClick={handalepackageSubmit}
                                className={`btn_primary ${
                                    postloader
                                        ? "bg-white text-black border"
                                        : "bg-blue text-white"
                                }`}
                            >
                                {postloader ? (
                                    <Loader
                                        className='animate-spin'
                                        stroke='black'
                                        fill='black'
                                    />
                                ) : (
                                    t("bookNow")
                                )}
                            </button>
                        </div>
                    </DialogContent>
                    <DialogActions></DialogActions>
                </Dialog>
            </React.Fragment>
        </div>
    );
};

export default ChildPackageDetails;
