import React, { useState } from 'react';
import './Explorer.css';
import Image from './Image';
import ImageEdit from './ImageEdit';

const Explorer = () => {
  const imageInit = [
    { path: 'images/_DSC4537.jpg', name: 'image 1', selected: false },
    { path: 'images/_DSC4656.jpg', name: 'image 2', selected: false },
    { path: 'images/_DSC4666.jpg', name: 'image 3', selected: true },
    { path: 'images/_DSC4671.jpg', name: 'image 4', selected: false },
    { path: 'images/_DSC4680.jpg', name: 'image 5', selected: false },
    { path: 'images/_DSC4685.jpg', name: 'image 6', selected: true },
    { path: 'images/_DSC4686.jpg', name: 'image 7', selected: false },
    { path: 'images/_DSC4689.jpg', name: 'image 8', selected: false },
    { path: 'images/_DSC4691.jpg', name: 'image 9', selected: false },
  ];

  const [images, setImages] = useState(imageInit);

  const selectImage = (name: string) =>
    setImages(
      images.map((image) =>
        name === image.name ? { ...image, selected: !image.selected } : image,
      ),
    );

  const selectAll = (select: boolean) =>
    setImages(images.map((image) => ({ ...image, selected: select })));

  const imagesRender = images.map((image) => (
    <Image image={image} select={selectImage} />
  ));

  const selectedImages = images.filter((image) => image.selected);

  return (
    <div>
      <div>
        <a className="link" onClick={() => selectAll(true)}>
          Select all
        </a>{' '}
        /{' '}
        <a className="link" onClick={() => selectAll(false)}>
          Deselect All
        </a>
      </div>
      <div className="Panel">
        <div className="Images">{imagesRender}</div>
        <div className="Editor">
          {' '}
          <ImageEdit images={selectedImages} />
        </div>
      </div>
    </div>
  );
};

export default Explorer;
