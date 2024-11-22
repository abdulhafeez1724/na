"use client"; // Ensures this component is client-side only

import { useState, useEffect } from "react";
import api from "@/utils/api"; // Import the API instance
import withAuth from "@/utils/withAuth"; // Import the HOC

function Tags() {
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ensure client-side fetching only
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await api.get("/tags/");
        setTags(response.data);
      } catch (err) {
        console.error("Error fetching tags:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchTags();
  }, []);
  

  return (
    <div className="container my-4">
      <h2 className="mb-4">Tags</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}
      {!isLoading && !error && (
        <table className="table table-bordered">
          <thead className="thead-light">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Tags</th>
            </tr>
          </thead>
          <tbody>
            {tags.map((tag, index) => (
              <tr key={tag.id}>
                <th scope="row">{index + 1}</th>
                <td>{tag.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default withAuth(Tags);
