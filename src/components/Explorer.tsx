import React, { useState } from 'react';
import './Explorer.css';
import Image from './Image';
import ImageEdit from './ImageEdit';

let lastSelectedImage = '';

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

  const selectImage = (event: React.MouseEvent, name: string) => {
    if (event.ctrlKey) {
      setImages(
        images.map((image) => ({
          ...image,
          selected: name === image.name ? !image.selected : image.selected,
        })),
      );
    } else if (event.shiftKey && lastSelectedImage !== '') {
      const selection1 = images.findIndex((image) => image.name === name);
      const selection2 = images.findIndex((image) => image.name === lastSelectedImage);
      if (selection1 >= 0 && selection2 >= 0) {
        const startSelection = Math.min(selection1, selection2);
        const endSelection = Math.max(selection1, selection2);
        setImages(
          images.map((image, index) => ({
            ...image,
            selected:
              index >= startSelection && index <= endSelection ? true : image.selected,
          })),
        );
      }
    } else {
      setImages(images.map((image) => ({ ...image, selected: name === image.name })));
    }
    lastSelectedImage = name;
  };

  const selectAll = (select: boolean) =>
    setImages(images.map((image) => ({ ...image, selected: select })));

  const imagesRender = images.map((image) => (
    <Image key={image.name} image={image} select={selectImage} />
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
