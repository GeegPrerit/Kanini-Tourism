import React, { useState, useEffect } from 'react';
import info1 from "./img/info1.png";
import info2 from "./img/info2.png";
import info3 from "./img/info3.png";
import styled from "styled-components";
import { Link } from 'react-router-dom';

const TourDetails = () => {
  useEffect(() => {
    fetchPlans();
  }, []);
  const [plans, setPlans] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const history = useHistory();
  const fetchPlans = async () => {
    try {
      const response = await fetch("https://localhost:7023/api/TravelDetails");
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
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPlans = plans.filter((plan) => {
    return plan.location && plan.location.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const plansToDisplay = searchQuery ? filteredPlans : plans;


  return (<>
    <div className="container-fluid mt-3">
      <div className="row justify-content-center"> {/* Center the search bar */}
        <div className="col-md-6"> {/* Limit the width of the search bar */}
          <div className="input-group">
            <input
              type="text"
              className="form-control rounded-pill"
              placeholder="Search by Location"
              aria-label="Search"
              aria-describedby="search-button"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="input-group-append">
              <button className="btn btn-outline-primary rounded-pill" type="button" id="search-button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Section id="recommend">
      <div className="title">
        <h2>Tours We Offer</h2>
      </div>
      <div className="destinations">
        {plansToDisplay.length === 0 ? ( // Check if plansToDisplay is empty
          <div className="destination">Location not found.</div> // Render message when no plans match the search query
        ) : (
          // Render plans when plansToDisplay is not empty
          plansToDisplay.map((plan, index) => {
            return (
              <div className="destination" key={plan.planId}>
                {/* Rest of your plan details rendering */}
                <img src={`data:image/jpeg;base64,${plan.planImage}`} alt="" />
                <h3>Plan Title: {plan.planTitle}</h3>
                <p>Location: {plan.location}</p>
                <div className="info">
                  {/* Rest of the info */}
                  <div className="services">
                  <img src={info1} alt="" />
                  <img src={info2} alt="" />
                  <img src={info3} alt="" />
                </div>
                <Link to={`/Booking?id=${plan.planId}`} className="btn btn-primary">
                  ₹ {plan.planPrice}
                </Link>
                </div>
                <div className="distance">
                <span>1000 Kms</span>
                <span>{plan.duration}</span>
              </div>
              </div>
            );
          })
        )}
      </div>
    </Section>
  </>
  );
}
const Section = styled.section`
  padding: 2rem 0;
  .title {
    text-align: center;
  }
  .packages {
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    ul {
      display: flex;
      list-style-type: none;
      width: max-content;
      li {
        padding: 1rem 2rem;
        border-bottom: 0.1rem solid black;
      }
      .active {
        border-bottom: 0.5rem solid #8338ec;
      }
    }
  }
  .destinations {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    padding: 0 3rem;
    .destination {
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      background-color: #8338ec14;
      border-radius: 1rem;
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(0.4rem) translateY(-1rem);
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
      img {
        width: 100%;
      }
      .info {
        display: flex;
        align-items: center;
        .services {
          display: flex;
          gap: 0.3rem;
          img {
            border-radius: 1rem;
            background-color: #4d2ddb84;
            width: 2rem;
            /* padding: 1rem; */
            padding: 0.3rem 0.4rem;
          }
        }
        display: flex;
        justify-content: space-between;
      }
      .distance {
        display: flex;
        justify-content: space-between;
      }
    }
  }
  @media screen and (min-width: 280px) and (max-width: 768px) {
    .packages {
      ul {
        li {
          padding: 0 0.5rem;
          font-size: 2vh;
          padding-bottom: 1rem;
        }
        .active {
          border-bottom-width: 0.3rem;
        }
      }
    }
    .destinations {
      grid-template-columns: 1fr;
      padding: 0;
    }
  }
`;

export default TourDetails;
