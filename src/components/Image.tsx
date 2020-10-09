import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { dragItems } from '../types/items';
import { IImage } from '../types/interfaces';
import './Image.css';

type ImageProps = {
  image: IImage;
  selectImage: (event: React.MouseEvent, id: string) => void;
  findImage: (id: string) => { index: number };
  moveImage: (id: string, to: number) => void;
};

interface Item {
  type: string;
  id: string;
  originalIndex: number;
}

const Image = ({ image, selectImage, findImage, moveImage }: ImageProps) => {
  const originalIndex = findImage(image.id).index;

  const [{ isDragging }, drag] = useDrag({
    item: { type: dragItems.IMAGE, id: image.id, originalIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
    end: (_dropResult, monitor) => {
      const { id: droppedId, originalIndex } = monitor.getItem();
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        moveImage(droppedId, originalIndex);
      }
    },
  });

  const [, drop] = useDrop({
    accept: dragItems.IMAGE,
    canDrop: () => true,
    hover({ id: draggedId }: Item) {
      if (draggedId !== image.id) {
        const { index: overIndex } = findImage(image.id);
        moveImage(draggedId, overIndex);
      }
    },
  });

  const opacity = isDragging ? 0 : 1;
  const selectedClass = image.selected ? ' image-selected' : '';
  return (
    <div
      ref={node => drag(drop(node))}
      style={{ opacity }}
      className={'Image' + selectedClass}
      onClick={event => selectImage(event, image.id)}
    >
      <img src={image.path} />
      <div>{image.name}</div>
    </div>
  );
};

export default Image;
