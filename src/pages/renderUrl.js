import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RenderUrl() {
    const navigate = useNavigate();
    const location = useLocation();
    const paramsdata = location.state;
    var url = paramsdata.url;
    var seelectedcardType = paramsdata.cardType;
    const [cardType, setCardType] = useState('visa');
    const [html, setHTML] = useState('');
    const iframeRef = useRef(null);

    const getData = async () => {
        var html = "";
        cardType
        if (seelectedcardType == 'visa')
            {
                setCardType("VISA");
                if (url != '' && url != null) {
                    html = `<html><head><script src='${url}'> </script></head><body><form action='https://fxmaster.co.uk/login' class='paymentWidgets' data-brands='VISA'></form></body></html>`;
                    setHTML(html)
                }
            }
        if (seelectedcardType == 'master_card')
            {
                setCardType("MASTER");
                if (url != '' && url != null) {
                    html = `<html><head><script src='${url}'> </script></head><body><form action='https://fxmaster.co.uk/login' class='paymentWidgets' data-brands='MASTER'></form></body></html>`;
                    setHTML(html)
                }
            }
        if (seelectedcardType == 'amex')
            {
                setCardType("AMEX");
                if (url != '' && url != null) {
                    html = `<html><head><script src='${url}'> </script></head><body><form action='https://fxmaster.co.uk/login' class='paymentWidgets' data-brands='AMEX'></form></body></html>`;
                    setHTML(html)
                }
            }
    }

    useEffect(() => {
        getData();

        const getIframeUrl = () => {
            if (iframeRef.current && iframeRef.current.contentWindow) {
                if(iframeRef.current.contentWindow.location.href.includes("login")){
                    navigate('/')
                }
            }
        };

        // Optionally, set up an interval or an event listener to update the URL if it changes
        const intervalId = setInterval(getIframeUrl, 5000);

        return () => clearInterval(intervalId);

    },[])
    return (
        <>
            {html != "" ?
                <iframe ref={iframeRef} srcDoc={html} style={{ width: '100%', height: '100%' }}></iframe> : ""}
        </>
    );
}

export default RenderUrl