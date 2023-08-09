import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Admin = () => {
  const [agents, setAgents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [image, setGalaryImage] = useState(null);
  const [imageTitle, setTitle] = useState(null);
  // const [image, setGalaryImage] = useState(null);

  useEffect(() => {
    fetchAgent();
  }, []);

  const fetchAgent = () => {
    fetch('https://localhost:7023/api/TravelAgent')
      .then((response) => response.json())
      .then((data) => {
        setAgents(data);
      })
      .catch((error) => {
        console.log('Error fetching Agent:', error);
      });
  };


  const updateAgent = async (id, updatedData) => {
    try {
      const response = await fetch(`https://localhost:7023/api/TravelAgent/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        toast.success('Agent Status updated successfully');
        fetchAgent();
      } else {
        console.error('Error updating Agent:', response.statusText);
        window.alert('Failed to update Agent');
      }
    } catch (error) {
      console.error('Error updating Agent:', error);
    }
  };

  const handleModalOpen = (agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedAgent(null);
    setShowModal(false);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('imageTitle', imageTitle);
      formData.append('image', image);
      if (imageTitle && image) {
        const response = await fetch('https://localhost:7023/api/ImageGalleryControler', {
          method: 'POST',
          body: formData,
        });
        console.log(imageTitle);
        if (response.ok) {
          console.log(response);
          toast.success('Image Inserted Successfully');
        } else {
          alert('error');
          console.log('Error:', response);
        }
      } else {
        toast.warning("field should not be empty")
      }

    } catch (error) {
      console.log('Error:', error);
    }

    handleModalClose();
    setTitle('');
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const fileReader = new FileReader();

    fileReader.onload = (event) => {
      const fileData = event.target.result;
      const byteArray = new Uint8Array(fileData);
      const numbersArray = Array.from(byteArray);
      const base64String = btoa(String.fromCharCode.apply(null, numbersArray));
      setGalaryImage(base64String);
    };

    fileReader.readAsArrayBuffer(file);
  };
  


  return (
    <div className="container">
      <h2 className="mt-3">Admin Panel</h2>

      <table className="table mt-3">
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Agent Name</th>
            <th>Agent Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent, index) => (
            <tr key={agent.travelAgentId}>
              <td>{index + 1}</td>
              <td>{agent.userName}</td>
              <td>{agent.email}</td>
              <td>
                <Button
                  variant={agent.isApproved === 'Approved' ? 'success' : 'warning'}
                  style={{ minWidth: '100px', minHeight: '100px' }}
                  onClick={() =>
                    updateAgent(agent.travelAgentId, {
                      ...agent,
                      isApproved: agent.isApproved === 'Approved' ? 'Not Approved' : 'Approved',
                    })
                  }
                >
                  {agent.isApproved}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Edit Agent button outside the table */}
      <Button className="d-flex justify-content-start mb-3" variant="primary" onClick={() => handleModalOpen(null)}>
        Add More Details
      </Button>
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedAgent ? 'Edit Images' : 'Add Images for Tour Gallery'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
            <div className="form-group">
              <label >Image Title:</label>
              <input type="Text" className="form-control" value={imageTitle} onChange={handleTitleChange} />
              <label >Image:</label>
              <input type="file" className="form-control" onChange={handleImageChange} />
            </div>

            <button type="submit" className="btn btn-primary" accept="image/*">
              {selectedAgent ? 'Save Changes' : 'Add Images'}
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Admin;
