import React, { useCallback, useState } from 'react';

const useUpdateContact = (url, datas) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const updateData = useCallback(async() => {
    setLoading(true)
    try {
        await fetch(`${process.env.BASE_URL}/${id}`,{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datas),
      })
      setLoading(false)
    } catch (e) {
      setLoading(false)
      setError(e)
      return e
    }
  }, [datas,url]);

  return { error,loading,updateData };
};

export default useUpdateContact;
