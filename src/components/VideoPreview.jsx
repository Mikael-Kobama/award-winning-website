import { gsap } from "gsap";
import { useState, useRef, useEffect } from "react";

export const VideoPreview = ({ children }) => {
  const [isHovering, setIsHovering] = useState(false);

  const sectionRef = useRef(null); // Reference for the container section
  const contentRef = useRef(null);

  const handleMouseMove = ({ clientX, clientY, currentTarget }) => {
    const rect = currentTarget.getBoundingClientRect();

    const xOffset = clientX - (rect.left + rect.width / 2); // Calculate X offset
    const yOffset = clientY - (rect.top + rect.height / 2);

    if (isHovering) {
      // Move the container slightly in the direction of the cursor
      gsap.to(sectionRef.current, {
        x: xOffset,
        y: yOffset,
        rotationY: xOffset / 2, // Add 3D rotation effect
        rotationX: -yOffset / 2,
        transformPerspective: 500, // Perspective for realistic 3D effect
        duration: 1,
        ease: "power1.out",
      });

      gsap.to(contentRef.current, {
        x: -xOffset,
        y: -yOffset,
        duration: 1,
        ease: "power1.out",
      });
    }
  };

  useEffect(() => {
    if (!isHovering) {
      gsap.to(sectionRef.current, {
        x: 0,
        y: 0,
        rotationY: 0,
        rotationX: 0,
        duration: 1,
        ease: "power1.out",
      });

      gsap.to(contentRef.current, {
        x: 0,
        y: 0,
        duration: 1,
        ease: "power1.out",
      });
    }
  }, [isHovering]);

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="absolute z-50 size-full overflow-hidden rounded-lg"
      style={{
        perspective: "500px",
      }}
    >
      <div
        ref={contentRef}
        className="origin-center rounded-lg"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {children}
      </div>
    </section>
  );
};

export default VideoPreview;
