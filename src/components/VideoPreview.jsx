import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react";

export const VideoPreview = ({ children }) => {
  const [isHovering, setHovering] = useState(false);

  const sectionRef = useRef(null); // Reference for the container section
  const contentRef = useRef(null);
};
