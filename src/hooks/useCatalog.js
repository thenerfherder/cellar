import { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export function useCatalog() {
  const [data, setData] = useState({ producers: [], entries: [] });

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'catalog', 'wines'),
      (snap) => {
        if (snap.exists()) {
          setData({
            producers: snap.data().producers ?? [],
            entries: snap.data().entries ?? [],
          });
        }
      },
      (error) => console.error('[useCatalog] Firestore read failed — check security rules for catalog/wines:', error)
    );
    return unsubscribe;
  }, []);

  const producers = [...data.producers].sort();

  // Returns wine names for a given producer (or all wine names if no producer given)
  const getWineNames = (producer) => {
    if (!producer) {
      return [...new Set(data.entries.map(e => e.split('||')[1]))].sort();
    }
    const prefix = producer.toLowerCase() + '||';
    return [...new Set(
      data.entries
        .filter(e => e.toLowerCase().startsWith(prefix))
        .map(e => e.split('||')[1])
    )].sort();
  };

  return { producers, getWineNames };
}
