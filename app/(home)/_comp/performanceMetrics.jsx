"use client";

import React, { useEffect, useState } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const PerformanceMetrics = () => {
  const [stats, setStats] = useState({});
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/get/site-settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          setStats(data.data || {});
        }
        setLoader(false);
      })
      .catch(() => setLoader(false));
  }, []);

  const cards = [
    { label: "Successful Medical Visas Approved", value: stats.stat_visas_approved },
    {
      label: "Successful Complex Clinical Events Coordinated",
      value: stats.stat_complex_cases_coordinated,
    },
  ];

  if (!loader && cards.every((c) => !c.value)) {
    return null;
  }

  return (
    <div className="mx-5 my-10 md:my-20 md:container md:mx-auto">
      <h5 className="text-center text-2xl md:text-4xl font-semibold text-blue mb-10">
        Our Track Record
      </h5>
      <div className="grid md:grid-cols-2 gap-5">
        {cards.map(
          (card) =>
            card.value && (
              <div
                key={card.label}
                className="flex flex-col items-center gap-2 p-8 rounded-xl shadow-xl border border-ash/20 text-center"
              >
                <AnimatedCounter
                  text={card.value}
                  className="text-3xl md:text-4xl font-bold text-blue"
                />
                <p className="text-black/70">{card.label}</p>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default PerformanceMetrics;
