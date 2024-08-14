// src/context/ProfileContext.js
import { createContext, useState, useEffect } from 'react';
import { firestore } from '@/app/Create-account/auth'; // Adjust the path as needed
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [savedData, setSavedData] = useState([]);
  const [newLinkSaved, setNewLinkSaved] = useState(false);

  // Function to fetch saved data
  const fetchSavedData = async () => {
    try {
      const q = query(collection(firestore, "links"), orderBy("timestamp", "desc"), limit(5));
      const querySnapshot = await getDocs(q);
      const fetchedData = querySnapshot.docs.map(doc => doc.data());
      setSavedData(fetchedData.reverse()); // Reverse the order to have the most recent at the bottom
    } catch (error) {
      console.error('Error fetching saved data:', error);
    }
  };

  useEffect(() => {
    fetchSavedData();
  }, []);

  useEffect(() => {
    if (newLinkSaved) {
      fetchSavedData();
      setNewLinkSaved(false);
    }
  }, [newLinkSaved]);

  return (
    <ProfileContext.Provider value={{ savedData, setNewLinkSaved }}>
      {children}
    </ProfileContext.Provider>
  );
};

export default ProfileContext;



