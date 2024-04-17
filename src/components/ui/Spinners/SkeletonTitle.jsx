import React from "react";
import ContentLoader from "react-content-loader";

export const SkeletonTitle = (props) => (
  <ContentLoader
    speed={1}
    width={400}
    height={60}
    viewBox="0 0 400 60"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="20" y="5" rx="4" ry="4" width="350" height="53" />
  </ContentLoader>
);
