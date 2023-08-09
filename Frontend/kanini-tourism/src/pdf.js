import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import Logo from './img/logo.png';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignSelf: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  content: {
    fontSize: 12,
  },
});

const MyDynamicPDF = ({ booking }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header Section */}
        <View style={styles.header}>
          <Image src={Logo} style={styles.logo} />
          <Text>Make Your Trip</Text>
        </View>

        {/* Content Section */}
        <View style={styles.section}>
          <Text style={styles.title}>Booking Details</Text>
          <View style={styles.content}>
            <Text>Name: {booking.travelerName}</Text>
            <Text>Email: {booking.email}</Text>
            <Text>Mobile Number: {booking.mobileNumber}</Text>
            <Text>Starting Date: {booking.startDate}</Text>
            <Text>Ending Date: {booking.endDate}</Text>
            {/* Add other booking details as needed */}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default MyDynamicPDF;
