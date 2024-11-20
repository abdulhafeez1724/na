// src/app/protected/page.js
"use client";

import { useEffect, useState } from "react";

export default function Protected() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("No token found");
        return;
      }

      const response = await fetch("http://127.0.0.1:8000/api/tags/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        setError("Failed to fetch data or token expired");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h1>Tags</h1>
          <ul>
            {data.map((tag) => (
              <li key={tag.id}>{tag.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
