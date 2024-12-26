'use client'

import { useEffect, useState } from "react";

export default function Home() {
  const [apiResponse, setApiResponse] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`);
        const text = await response.text();
        setApiResponse(text);
      } catch (error) {
        console.error('Error fetching data:', error);
        setApiResponse('Error loading data');
      }
    };

    fetchData();
  }, []);

  return <h1 className="border rounded text-red-900">{apiResponse}</h1>;
}
