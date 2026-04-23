import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DataFetcher.module.css';

function DataFetcher(){
  const [characterId, setCharacterId] = useState(1);
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`https://api.api-onepiece.com/v2/characters/en/${characterId}`);
        setCharacter(response.data);
      } catch (err) {
        setError(`Can't find pirate or network erorr! ${err.message}`);
        console.error("Erorr details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [characterId]);

  const handleNext = () => setCharacterId(c => c + 1);
  const handlePrev = () => setCharacterId(c => (c > 1 ? c - 1 : 1));
  const handleReset = () => setCharacterId(1);

  if (loading) return <div className={styles.container}>
                        <p className={styles.paragraph2}>Loading...</p>
                      </div>;

  return (
    <div className={styles.container}>
      <img src='./one-piece-logo.png' alt="One Piece Logo" className={styles.logo} />
      <h2 className={styles.title}>One Piece Explorer</h2>

      {error ? (<p className={styles.alert}>⚠️ {error}</p>) 
      : (
        <div>
          <p className={styles.paragraph}><strong>ID</strong>: {characterId}</p>
          <p className={styles.paragraph}><strong>Name:</strong> {character?.name || "Unknown"}</p>
          <p className={styles.paragraph}><strong>Crew:</strong> {character?.crew?.name || "Unknown"}</p>
          <p className={styles.paragraph}><strong>Bounty:</strong> {character?.bounty || "0"} ฿</p>
          <p className={styles.paragraph}><strong>Devil Fruit:</strong> {character?.fruit?.name || "None"}</p>
        </div>
      )}
      <div className={styles.buttonContainer}>
        <button className={`${styles.button} ${styles.prev}`} onClick={handlePrev}>Prev</button>
        <button className={`${styles.button} ${styles.reset}`} onClick={handleReset}>Reset</button>
        <button className={`${styles.button} ${styles.next}`} onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default DataFetcher;