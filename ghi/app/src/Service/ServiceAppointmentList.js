import React, { useState, useEffect } from "react";

function ServiceAppointmentList() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    const url = "http://localhost:8090/api/hats/";
    const result = await fetch(url);
    const hatsJSON = await result.json();
    console.log(hatsJSON);
    setAppointments(hatsJSON.hats);
  };

  useEffect(() => {
    fetchHats();
  }, []);

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8090/api/hats/${id}`, {
      method: "DELETE",
    });
    setAppointments(
      hats.filter((hat) => {
        return hat.id !== id;
      })
    );
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Fabric</th>
          <th>Style Name</th>
          <th>Color</th>
          <th>Picture</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {hats.map((hat) => {
          return (
            <tr key={hat.id}>
              <td>{hat.fabric}</td>
              <td>{hat.style_name}</td>
              <td>{hat.color}</td>
              <td>{hat.picture_url}</td>
              <td>http://localhost:3000{hat.location.import_href}</td>
              <td>
                <button onClick={() => handleDelete(hat.id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default ServiceAppointmentList
