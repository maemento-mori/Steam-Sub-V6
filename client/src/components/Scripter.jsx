import React, { useEffect } from 'react';

function Scripter() {
  useEffect(() => {
    const script = document.createElement('script');

    script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <p>test</p>
  );
}

export default Scripter;