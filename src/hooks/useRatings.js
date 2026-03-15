import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, setDoc, updateDoc, deleteField } from 'firebase/firestore';
import { db } from '../firebase';

const toRatingKey = (wineKey) => wineKey.replace(/\//g, '|');

export function useRatings(user) {
  const [ratings, setRatings] = useState({});

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(collection(db, 'ratings'), (snapshot) => {
      const data = {};
      snapshot.forEach(docSnap => {
        data[docSnap.id] = docSnap.data();
      });
      setRatings(data);
    });
    return unsubscribe;
  }, [user]);

  const getRatingInfo = (wineKey) => {
    const key = toRatingKey(wineKey);
    const entry = ratings[key];
    if (!entry?.userRatings) return { myRating: null, average: null, count: 0 };
    const allRatings = Object.values(entry.userRatings).filter(v => v != null && v > 0);
    const count = allRatings.length;
    const average = count > 0 ? allRatings.reduce((a, b) => a + b, 0) / count : null;
    return {
      myRating: entry.userRatings[user.uid] ?? null,
      average,
      count,
    };
  };

  const setRating = async (wineKey, rating) => {
    const key = toRatingKey(wineKey);
    const ratingDoc = doc(db, 'ratings', key);
    const value = rating === null ? deleteField() : rating;
    try {
      await updateDoc(ratingDoc, { [`userRatings.${user.uid}`]: value });
    } catch {
      if (rating !== null) {
        await setDoc(ratingDoc, { userRatings: { [user.uid]: rating } });
      }
    }
  };

  return { getRatingInfo, setRating };
}
