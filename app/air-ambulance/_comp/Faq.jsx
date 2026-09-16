"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  const t = useTranslations("airAmbulance.landing.faq");
  const items = t.raw("items");
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (_event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <h2 className="text-xl md:text-2xl font-bold text-blue mb-6">
        {t("heading")}
      </h2>
      <div className="flex flex-col gap-3">
        {items.map((item, i) => (
          <Accordion
            key={i}
            expanded={expanded === i}
            onChange={handleChange(i)}
            className="!shadow border !border-ash/30 !rounded-xl before:!hidden"
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon className="text-blue" />}>
              <p className="font-semibold text-blue">{item.question}</p>
            </AccordionSummary>
            <AccordionDetails>
              <p className="text-sm text-black/70">{item.answer}</p>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Faq;
