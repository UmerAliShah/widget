// ParentPage.js
import React, { useState, useEffect, useRef } from "react";

const ParentPage = () => {
    const [recivedData, setRecivedData] = useState([]);
    console.log(recivedData, "comming from widget")
    useEffect(() => {
        window.addEventListener("message", handleMessage);

        return () => {
            window.removeEventListener("message", handleMessage);
        };
    }, []);

    const handleMessage = (event) => {
        console.log(event, "widget handle")


        const { donationData } = event.data;

        setRecivedData(donationData);
    };

    const handleIframeLoad = () => {
        const message = { type: "INITIALIZE" };
        iframeRef.current.contentWindow.postMessage(message, "https://widget-three-mu.vercel.app/");
    };

    const iframeRef = useRef();

    return (
        <div>
            <h1>Parent Page</h1>
            <iframe
                src="https://widget-three-mu.vercel.app/"
                width="400"
                height="300"
                title="Widget IFrame"
                ref={iframeRef}
                onLoad={handleIframeLoad}
            ></iframe>
            <table>
                <thead>
                    <tr>
                        <th>Organization</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {recivedData?.map((donation, index) => (
                        <tr key={index}>
                            <td>{donation?.organization}</td>
                            <td>${donation?.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ParentPage;
