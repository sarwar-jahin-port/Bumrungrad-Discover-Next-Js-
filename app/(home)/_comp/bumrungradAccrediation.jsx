import { GiTrophyCup } from "react-icons/gi";
import { getTranslations } from "next-intl/server";

export default async function BumrungradAccrediation() {
  const t = await getTranslations("home.accreditation");
  const awards = t.raw("awards");
  return (
    <section className="mx-5 md:container md:mx-auto p-10 md:p-20 bg-blue text-white shadow rounded">
      <h2 className="text-xl md:text-2xl text-center font-semibold ">
        {t("heading")}
      </h2>
      <ul className="grid gap-5 lg:grid-cols-2 mt-5 md:mt-10">
        {awards.map((a, i) => (
          <li key={i} className="flex items-center gap-2">
            <GiTrophyCup className="text-2xl md:text-4xl " /> 
            <span className="text-xl md:text-2xl font-semibold">{a}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
