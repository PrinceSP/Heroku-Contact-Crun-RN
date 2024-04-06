import React, { useCallback, useState } from 'react';

const useSaveData = (url, method, datas) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateData = useCallback(async() => {
    setLoading(true)
    try {
      const response = await fetch(url,{
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datas),
      })
      setLoading(false)
    } catch (e) {
      setLoading(false)
      setResponse(e)
      return e
    }
  }, [datas,url]);

  return { loading,response,updateData };
};

export default useSaveData;
