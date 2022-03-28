import React from "react";


export const useFetch = <T>(api:((arg1?: string) => Promise<T>)) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState<T|null>(null);


  React.useEffect(()=>{
  const getData = async () => {
    try {
      setLoading(true);
      const res =await api()
      setData(res)
    } catch (e:any) {
      setError(!!e ?e?.message:e);
      setData(null)

    } finally {
      setLoading(false);
    }
  };
  getData()


  },[api])
  
  return [data, loading, error] as const;
};
