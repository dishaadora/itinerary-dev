import React, { useEffect, useState, useRef } from "react";
import Lottie from "lottie-react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { useLocation } from "react-router-dom";
import { animate } from "animejs";
import "./Roadmap.css";

import trailAnimation from "../animations/Trailine.json";
import diningIcon from "../animations/DiningLottie.json";
import monumentIcon from "../animations/MonumentLottie.json";
import funIcon from "../animations/bpack.json";

// Get the icon for each type
const getLottieIcon = (type) => {
  switch (type) {
    case "Fine Dining":
      return diningIcon;
    case "Historic Monument":
      return monumentIcon;
    case "Fun Activity":
      return funIcon;
    default:
      return null;
  }
};

const SortablePlace = ({ place, index, popupRef }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: place.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    position: "relative",
  };

  const animateIn = () => {
    if (popupRef?.current) {
      requestAnimationFrame(() => {
        animate({
          targets: popupRef.current,
          opacity: [0, 1],
          translateY: [20, 0],
          easing: "easeOutQuad",
          duration: 400,
          begin: () => {
            popupRef.current.style.display = "block";
          },
        });
      });
    }
  };

  const animateOut = () => {
    if (popupRef?.current) {
      requestAnimationFrame(() => {
        animate({
          targets: popupRef.current,
          opacity: [1, 0],
          translateY: [0, 20],
          easing: "easeInQuad",
          duration: 300,
          complete: () => {
            popupRef.current.style.display = "none";
          },
        });
      });
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      <div className="place-icon">
        <Lottie animationData={getLottieIcon(place.type)} loop />
        <p className="place-name">{place.name}</p>
      </div>
      <div className="popup" ref={popupRef} style={{ display: "none", opacity: 0 }}>
        <h3>{place.name}</h3>
        <p>{place.description}</p>
        <ul>
          {place.accessories.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Roadmap = ({ selectedPlaces, placeData }) => {
  const location = useLocation();
  const [places, setPlaces] = useState([]);
  const popupRefs = useRef([]);

  useEffect(() => {
    const newPlaces = selectedPlaces
      .map((name, i) => {
        const place = placeData.find((p) => p.name === name);
        return place ? { ...place, id: `place-${i}` } : null;
      })
      .filter(Boolean);
    setPlaces(newPlaces);
  }, [selectedPlaces, placeData]);

  useEffect(() => {
    popupRefs.current = Array(places.length)
      .fill()
      .map((_, i) => popupRefs.current[i] || React.createRef());
  }, [places]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = places.findIndex((item) => item.id === active.id);
    const newIndex = places.findIndex((item) => item.id === over.id);

    setPlaces((prev) => arrayMove(prev, oldIndex, newIndex));
  };

  if (places.length === 0) {
    return <p className="empty-message">No places selected yet.</p>;
  }

  // 🔽 Split left/right before return
  const leftColumn = places.filter((_, i) => i % 2 === 0);
  const rightColumn = places.filter((_, i) => i % 2 !== 0);

  return (
  <div className="roadmap-container">
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={places.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        {/* Trail in the center */}
        <div className="trail-animation-wrapper">
          <Lottie animationData={trailAnimation} loop={false} className="trail-animation" />
        </div>

        {/* Absolute positioned places around the trail */}
        <div className="places-container" style={{ position: "relative", width: "100%", height: "100%" }}>
          {places.map((place, index) => {
            let positionStyle = {};

            if (index === 0) {
              // Left-top
              positionStyle = { left: '10%', transform: 'translateY(-140px)' };
            } else if (index === 1) {
              // Right-top
              positionStyle = { left: '75%', transform: 'translateY(-140px)' };
            } else if (index === 2) {
              // Center-bottom
              positionStyle = { left: '43%', transform: 'translateY(140px)' };
            }

            return (
              <div
                key={place.id}
                className={`place-wrapper ${index === 2 ? 'below' : 'above'}`}
                style={{ position: 'absolute', ...positionStyle }}
              >
                <SortablePlace
                  place={place}
                  index={index}
                  popupRef={popupRefs.current[index]}
                />
              </div>
            );
          })}
        </div>
      </SortableContext>
    </DndContext>
  </div>
);

};

export default Roadmap;
