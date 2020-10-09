import React, { useState } from 'react';
import './Explorer.css';
import Image from './Image';
import ImageEdit from './ImageEdit';
import update from 'immutability-helper';
import { imageInit } from '../mocks';

let lastSelectedImage = '';

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
