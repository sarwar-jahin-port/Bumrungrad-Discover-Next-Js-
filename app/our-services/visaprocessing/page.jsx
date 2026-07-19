"use client";

import React, { useState } from "react";
import personImg from "@/public/assets/Bumrungrad  Hospital_Abdus Samad.jpg";
import visaImg from "@/public/assets/service_logo/Bumrungrad  Hospital_visa_processing.png";
import PersonIcon from "@mui/icons-material/Person";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { FormControl, MenuItem, Select } from "@mui/material";
import Image from "next/image";
import { countries } from "@/public/data/country";
import UnifiedInboundForm from "@/components/shared/UnifiedInboundForm";

const VisaProcessing = () => {
    const [country, setCountry] = useState("");

    return (
        <>
            <section className='mx-5 md:container md:mx-auto pb-10'>
                <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold text-blue my-5 text-center'>
                    Process Your Visa
                </h1>
                {/* second card  */}
                <section className=''>
                    <p className='my-5 text-xl text-blue font-semibold'>
                        Where are you from?
                    </p>
                    <FormControl fullWidth className='md:!w-1/2'>
                        <p className='my-2.5'>Select Country(Required)</p>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={country ? country : country}
                            onChange={(e) => setCountry(e.target.value)}
                        >
                            {countries.map((c, i) => (
                                <MenuItem key={i} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </section>
                {country === "Bangladesh" ? (
                    <section className='flex flex-col justify-center items-center py-5 gap-4 shadow rounded md:w-1/2'>
                        <div className='mb-2'>
                            <Image
                                height={300}
                                width={500}
                                src={personImg}
                                alt='Bumrungrad International Hospital'
                                className='w-[100px] h-[100px] rounded-full mx-auto my-0'
                            />
                        </div>
                        <div>
                            <div className='flex items-center gap-2'>
                                <PersonIcon className='text-blue' />
                                <p className='text-center text-xl font-semibold'>
                                    Abdus Samad
                                </p>
                            </div>

                            <a
                                href='http://wa.me/+8801847284867'
                                target='_blank'
                                rel='noopener noreferrer'
                                alt='Bumrungrad Hospital'
                            >
                                <div className='flex items-center justify-center gap-2 mt-2'>
                                    <WhatsAppIcon className='text-green' />
                                    <p className='text-xl font-semibold'>
                                        01847284867
                                    </p>
                                </div>
                            </a>
                        </div>
                    </section>
                ) : (
                    country && (
                        <section className='py-5 md:w-2/3'>
                            <UnifiedInboundForm
                                image={visaImg}
                                imageAlt='Medical Visa Processing'
                                endpoint='http://127.0.0.1:8000/api/add/visa/precessing'
                                requireAuth
                            />
                        </section>
                    )
                )}
            </section>
        </>
    );
};

export default VisaProcessing;
