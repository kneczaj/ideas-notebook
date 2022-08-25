import React from 'react';
import { useState } from './hooks/state';

export interface Props {
  a: boolean;
  b: boolean;
  onClick: (result: string) => void;
}

export function SampleComponent({ a, b, onClick }: Props) {
  const [isDShown, setIsDShown] = useState(false);
  if (a) {
    return <div>A</div>;
  }
  if (b) {
    return <div>B</div>;
  }
  return (
    <div>
      <span>{isDShown ? 'D' : 'C'}</span>
      <button
        onClick={() => {
          setIsDShown(!isDShown);
          onClick('hello');
        }}
      >
        show D
      </button>
    </div>
  );
}
