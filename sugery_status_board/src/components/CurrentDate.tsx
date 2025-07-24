'use client';

import { useEffect, useState } from 'react';

export function CurrentDate() {
  const [date, setDate] = useState('');

  useEffect(() => {
    setDate(new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  return <p className="text-sm md:text-base">{date}</p>;
}

export function CurrentYear() {
    const [year, setYear] = useState(new Date().getFullYear());
  
    useEffect(() => {
      setYear(new Date().getFullYear());
    }, []);
  
    return <>{year}</>;
  }