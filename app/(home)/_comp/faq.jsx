"use client";

import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslations } from "next-intl";

export default function Faq() {
    const t = useTranslations("home.faq");
    const [expanded, setExpanded] = React.useState(false);

// accordion function
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const faq = t.raw("items");

    return (
        <div className='mx-5 my-16 md:my-32 md:container md:mx-auto'>
            <p className='text-xl md:text-2xl font-semibold text-blue'>
                {t("helpTitle")}
            </p>
            <div className='mt-5'>
                {faq.map((f, i) => (
                    <Accordion
                        key={i}
                        expanded={expanded === i}
                        onChange={handleChange(i)}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{f.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{f.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    );
}

