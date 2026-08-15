import React from "react";
import NewsDetailsPage from "./_comp/NewsDetails";

export async function generateMetadata({ params }) {
    const _news = await fetch(`https://api.discoverinternationalmedicalservice.com/api/get/news/${params?.id}`);
    const res = await _news.json();
    const news = res?.data;

    return {
        title: `${news?.newsTitle} - Bumrungrad Hospital`,
        description: news?.newsSlogan || `Discover top care at Bumrungrad Hospital's ${news?.newsTitle}.`,
        alternates: {
            canonical: `https://discoverinternationalmedicalservice.com/news/${params?.id}`,
        },
    };
}

const Page = ({ params }) => {
    return (
        <div>
            <NewsDetailsPage params={params} />
        </div>
    );
};

export default Page;
