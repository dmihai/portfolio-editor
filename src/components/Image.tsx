import React from 'react';
import './Image.css';

type ImageProps = {
  image: { path: string; name: string; selected: boolean };
  select: (name: string) => void;
};

const Image = ({ image, select }: ImageProps) => {
  const selectedClass = image.selected ? ' image-selected' : '';
  return (
    <div className={'Image' + selectedClass} onClick={() => select(image.name)}>
      <img src={image.path} />
      <div>{image.name}</div>
    </div>
  );
};

export default Image;
