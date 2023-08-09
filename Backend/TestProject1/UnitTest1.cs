using Kanini_Tourism.Controllers;
using Kanini_Tourism.Models;
using Kanini_Tourism.Repository;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace TestProject1
{
    public class UnitTest1
    {
        [Fact]
        public void Test_Record_Available_102()
        {
            //Arrange
            var user = new TravelAgent
            {
                TravelAgentId = 1,
                UserName = "Agent",
                Password="Agent@123",
                IsApproved="Approved"
            };
            var userRepository = new Mock<ITravelAgentRepository>();
            //mock setup
            userRepository.Setup(x => x.GetTravelAgentById(1)).Returns(user);
            //Act
            var getUserById = new TravelAgentController(userRepository.Object);
            //Assert
            var getAgentById = getUserById.GetAgentsById(1); 
            Assert.NotNull(getAgentById);
        }
/*
        [Fact]
        public void Test_Record_Available()
        {
            //Arrange
            var user = new TravelAgent
            {
                TravelAgentId = 1,
                UserName = "Agent",
                Password = "Agent@123",
                IsApproved = "NotApproved"
            };
            var userRepository = new Mock<ITravelAgentRepository>();

            //mock setup
            userRepository.Setup(x => x.GetTravelAgentById(1)).Returns(user);
            
            //Act
            var getUserById = new TravelAgentController(userRepository.Object);
            //Assert
            
            var retrievedAgent = getUserById.GetAgentsById(1);

            
            //Assert.NotNull(retrievedAgent);
            Assert.Equal(user.TravelAgentId, retrievedAgent.TravelAgentId);
            Assert.Equal(user.UserName, retrievedAgent.UserName);
            Assert.Equal(user.Password, retrievedAgent.Password);
            Assert.Equal(user.IsApproved, retrievedAgent.IsApproved);

        }*/

    }
}