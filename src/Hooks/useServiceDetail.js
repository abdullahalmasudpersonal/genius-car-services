import { useEffect, useState } from "react";

const useServiceDetail = serviceId =>{
    const [service, setService] = useState({});
    
    useEffect( () =>{
        const url = `https://pure-fjord-15769.herokuapp.com/service/${serviceId}`;
        console.log(url);
        
        fetch(url)
        .then(res => res.json())
        .then(data => setService(data));


    }, [serviceId]);
    
    return [service]
}

export default useServiceDetail;