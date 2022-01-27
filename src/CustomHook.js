import React, { useEffect, useState } from "react";

async function getLocationDetails(){
    const rawResponse = await fetch("https://ipapi.co/json");
    const response = await rawResponse.json();
    console.log(response);

    return response;
}

export const useLocationDetails = () => {
    const [locationDetail, setLocationDetail] = useState({"city": "", "region": "", "country_name": ""});
    useEffect(() => {
        async function updateLocation(){
            const response = await getLocationDetails();
            setLocationDetail(response);
        }
        updateLocation();
    }, []);
    return locationDetail;
}