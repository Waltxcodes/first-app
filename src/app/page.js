"use client";
import { useState, useEffect } from 'react';
import Navbar from '@/app/components/Navbar';
import Page from './Add-link/page';
import ProfileDetails from './profile-Details/page';
import { firestore } from '@/app/Create-account/auth'; // Adjust the path as needed
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

function App() {
  const [savedData, setSavedData] = useState([]);
  const [newLinkSaved, setNewLinkSaved] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [newProfileSaved, setNewProfileSaved] = useState(false);

  useEffect(() => {
    if (!newLinkSaved) {
      fetchSavedData();
    }
  }, [newLinkSaved]);

  const fetchSavedData = async () => {
    try {
      const q = query(collection(firestore, "links"), orderBy("timestamp", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map(doc => doc.data());
      console.log("Fetched data:", fetchedData);
      setSavedData(fetchedData.reverse()); // Reverse the order to have the most recent at the bottom
    } catch (error) {
      console.error('Error fetching saved data:', error);
    }
  };

  useEffect(() => {
    if (!newProfileSaved) {
      fetchProfileData();
    }
  }, [newProfileSaved]);

  const fetchProfileData = async () => {
    try {
      const q = query(collection(firestore, "profiles"), orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const data = querySnapshot.docs[0].data();
        setProfileData(data);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  return (
    <>
     
      <Page
        savedData={savedData}
        setSavedData={setSavedData}
        newLinkSaved={newLinkSaved}
        setNewLinkSaved={setNewLinkSaved}
      />
      <ProfileDetails
        profileData={profileData}
        setProfileData={setProfileData}
        newProfileSaved={newProfileSaved}
        setNewProfileSaved={setNewProfileSaved}
        savedData={savedData} // Pass savedData to ProfileDetails
      />
    </>
  );
}

export default App;


















