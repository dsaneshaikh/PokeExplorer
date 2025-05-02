// src/components/common/SkeletonLoader.jsx
import ContentLoader from "react-content-loader";

const SkeletonLoader = ({ type = "card" }) => (
  <ContentLoader
    speed={2}
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...(type === "card"
      ? { width: 300, height: 320, viewBox: "0 0 300 320" }
      : { width: "100%", height: 100, viewBox: "0 0 400 100" })}
  >
    {type === "card" ? (
      <>
        <rect x="0" y="0" rx="8" ry="8" width="300" height="200" />
        <rect x="20" y="220" rx="4" ry="4" width="120" height="20" />
        <rect x="20" y="260" rx="4" ry="4" width="80" height="20" />
        <rect x="20" y="290" rx="4" ry="4" width="100" height="20" />
      </>
    ) : (
      <>
        <rect x="0" y="15" rx="4" ry="4" width="100%" height="10" />
        <rect x="0" y="35" rx="4" ry="4" width="80%" height="10" />
        <rect x="0" y="55" rx="4" ry="4" width="60%" height="10" />
      </>
    )}
  </ContentLoader>
);

export default SkeletonLoader;
