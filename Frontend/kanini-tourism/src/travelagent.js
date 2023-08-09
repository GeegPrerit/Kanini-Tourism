import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './css/agent.css'
import { toast } from "react-toastify";
import jwt_decode from 'jwt-decode';

export const TraveleAgent = () => {
  const [agent, setAgent] = useState(null);
  const [plans, setPlans] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [planTitle, setPlanTitle] = useState("");
  const [planDescription, setPlanDescription] = useState("");
  const [location, setPlanLocation] = useState("");
  const [country, setPlanCountry] = useState("");
  const [persons, setPlanPerson] = useState("");
  const [itenary, setPlanItenary] = useState("");
  const [planPrice, setPlanPrice] = useState("");
  const [travelAgents, setTravelAgents] = useState("");
  const [planImage, setPlanImage] = useState(null);

  useEffect(() => {
    fetchAgents();
    fetchPlans();


  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch("https://localhost:7023/api/TravelAgent");
      if (response.ok) {
        const data = await response.json();
        setAgent(data);

        //console.log(agent);

      } else {
        console.error("Error fetching agents:", response.statusText);
        window.alert("Unauthorized");
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };
  //console.log(travelAgents);
  const fetchPlans = async () => {
    const accessToken = localStorage.getItem('jwttoken'); // Replace this with your actual access token
    const decodedToken = jwt_decode(accessToken);
    const userId = decodedToken.UserId;
    setTravelAgents(userId);
    try {
      const response = await fetch(`https://localhost:7023/api/TravelDetails/trip/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setPlans(data);
      } else {
        console.error("Error fetching agents:", response.statusText);
        window.alert("Unauthorized");
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  };


  //console.log("user id", travelAgents);
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (planTitle && planDescription && planPrice) {
      const accessToken = localStorage.getItem('jwttoken'); // Replace this with your actual access token
      const decodedToken = jwt_decode(accessToken);
      const userId = decodedToken.UserId;
      setTravelAgents(userId);
      try {
        const response = await fetch("https://localhost:7023/api/TravelDetails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planTitle,
            planDescription,
            location,
            country,
            persons,
            planImage,
            planPrice,
            itenary,
            agentId: userId,
          }),
        });

        if (response.ok) {

          //console.log(response);
          // Update the recently added doctor
          toast.success("Data Inserted");
        } else {
          alert("error");
          //console.log("Error:", response.status);
        }
      } catch (error) {
        //console.log("Error:", error);
      }
    }

    setPlanTitle("");
    setPlanDescription("");
    setPlanPrice("");
    setPlanImage("");
    setShowForm(false);
  };
  const handlePlanTitleChange = (event) => {
    setPlanTitle(event.target.value);
  };
  const handlePlanDecsChange = (event) => {
    setPlanDescription(event.target.value);
  };
  const handlePlanLocationChange = (event) => {
    setPlanLocation(event.target.value);
  };
  const handlePlanCountryChange = (event) => {
    setPlanCountry(event.target.value);
  };
  const handlePlanPersonChange = (event) => {
    setPlanPerson(event.target.value);
  };

  const handlePlanPriceChange = (event) => {
    setPlanPrice(event.target.value);
  };
  const handlePlanItenaryChange = (event) => {
    setPlanItenary(event.target.value);
  };

  const handleAddDetails = () => {
    setShowForm((prevState) => !prevState);
  };



  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      const fileData = event.target.result;
      const byteArray = new Uint8Array(fileData);
      const numbersArray = Array.from(byteArray);
      const base64String = btoa(
        String.fromCharCode.apply(null, numbersArray)
      );
      setPlanImage(base64String);
    };

    fileReader.readAsArrayBuffer(file);
  };

  return (
    <div className="container">
      <h1>Available Plans</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Plan Title</th>
            <th>Plan Description</th>
            <th>Location</th>
            <th>Country</th>
            <th>Add Persons</th>
            <th>Plan Image</th>
            <th>Plan Price</th>
            <th>Itenary</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, index) => (
            <tr key={plan.planId}>
              <td>{index + 1}</td>
              <td>{plan.planTitle}</td>
              <td>{plan.planDescription}</td>
              <td>{plan.location}</td>
              <td>{plan.country}</td>
              <td>{plan.persons}</td>
              <td>{plan.planImage && (
                <img
                  src={`data:image/jpeg;base64,${plan.planImage}`}
                  alt="PlanImage"
                  className="plan-image"
                />
              )}</td>
              <td>{plan.planPrice}</td>
              <td>{plan.itenary}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={handleAddDetails} className="btn btn-primary">
        {showForm ? "Hide Form" : "Add More Tour Plans"}
      </button>

      {showForm && (
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="name">Plan Title</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={planTitle}
              onChange={handlePlanTitleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="specialization">Plan Description</label>
            <input
              type="text"
              id="specialization"
              className="form-control"
              value={planDescription}
              onChange={handlePlanDecsChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Plan Location</label>
            <input
              type="text"
              id="phoneNumber"
              className="form-control"
              value={location}
              onChange={handlePlanLocationChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Plan Country</label>
            <input
              type="text"
              id="phoneNumber"
              className="form-control"
              value={country}
              onChange={handlePlanCountryChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Plan Person</label>
            <input
              type="text"
              id="phoneNumber"
              className="form-control"
              value={persons}
              onChange={handlePlanPersonChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctorImage">Plan Image</label>
            <input
              type="file"
              id="doctorImage"
              className="form-control"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Plan Price</label>
            <input
              type="text"
              id="phoneNumber"
              className="form-control"
              value={planPrice}
              onChange={handlePlanPriceChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phoneNumber">Plan Itenary</label>
            <input
              type="text"
              id="phoneNumber"
              className="form-control"
              value={itenary}
              onChange={handlePlanItenaryChange}
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default TraveleAgent;
