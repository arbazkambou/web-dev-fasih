import { useState } from "react";
import Star from "./Star";

function RatingStar({
  color = "#FFD700",
  size = "48px",
  maxRating = 10,
  stars,
  setStars,
}) {
  const [hoveringStars, setHoveringStars] = useState(0);

  function handleSetStar(index) {
    setStars(() => index);
  }
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        {Array.from({ length: maxRating }).map((_, index) => (
          <Star
            key={index}
            index={index}
            isFill={hoveringStars > index ? true : stars > index}
            handleSetStar={handleSetStar}
            setHoveringStars={setHoveringStars}
            color={color}
            size={size}
          />
        ))}
      </div>
      <p style={{ color, fontSize: `${size / 1.5}px` }}>
        {hoveringStars ? hoveringStars : stars}
      </p>
    </div>
  );
}

export default RatingStar;
