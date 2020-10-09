import React, { useState } from 'react';
import './Explorer.css';
import Image from './Image';
import ImageEdit from './ImageEdit';
import { IImage } from '../constants/interfaces';
import update from 'immutability-helper';

let lastSelectedImage = '';

const imageInit: IImage[] = [
  { id: 'p01', path: 'images/DSC_09917.jpg', name: 'image 1', selected: false },
  { id: 'p02', path: 'images/DSC_09922.jpg', name: 'image 2', selected: false },
  { id: 'p03', path: 'images/DSC_09959.jpg', name: 'image 3', selected: true },
  { id: 'p04', path: 'images/DSC_09967.jpg', name: 'image 4', selected: false },
  { id: 'p05', path: 'images/DSC_10012.jpg', name: 'image 5', selected: false },
  { id: 'p06', path: 'images/DSC_10058.jpg', name: 'image 6', selected: true },
  { id: 'p07', path: 'images/DSC_10073.jpg', name: 'image 7', selected: false },
  { id: 'p08', path: 'images/DSC_10076.jpg', name: 'image 8', selected: false },
  { id: 'p09', path: 'images/DSC_10096.jpg', name: 'image 9', selected: false },
];

const Explorer = () => {
  const [images, setImages] = useState(imageInit);

  const moveImage = (id: string, atIndex: number) => {
    const { image, index } = findImage(id);
    if (image) {
      setImages(
        update(images, {
          $splice: [
            [index, 1],
            [atIndex, 0, image],
          ],
        }),
      );
    }
  };

  const findImage = (id: string) => {
    const index = images.findIndex(image => image.id === id);
    return {
      image: images[index],
      index,
    };
  };

  const selectImage = (event: React.MouseEvent, id: string) => {
    if (event.ctrlKey) {
      setImages(
        images.map(image => ({
          ...image,
          selected: id === image.id ? !image.selected : image.selected,
        })),
      );
      lastSelectedImage = id;
    } else if (event.shiftKey && lastSelectedImage !== '') {
      const selection1 = images.findIndex(image => image.id === id);
      const selection2 = images.findIndex(
        image => image.id === lastSelectedImage,
      );
      if (selection1 >= 0 && selection2 >= 0) {
        const startSelection = Math.min(selection1, selection2);
        const endSelection = Math.max(selection1, selection2);
        setImages(
          images.map((image, index) => ({
            ...image,
            selected: index >= startSelection && index <= endSelection,
          })),
        );
      }
    } else {
      setImages(images.map(image => ({ ...image, selected: id === image.id })));
      lastSelectedImage = id;
    }
  };

  const selectAll = (select: boolean) =>
    setImages(images.map(image => ({ ...image, selected: select })));

  const imagesRender = images.map(image => (
    <Image
      key={image.id}
      image={image}
      selectImage={selectImage}
      findImage={findImage}
      moveImage={moveImage}
    />
  ));

  const selectedImages = images.filter(image => image.selected);

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
          <ImageEdit images={selectedImages} />
        </div>
      </div>
    </div>
  );
};

export default Explorer;
