import React from "react";
import ContentLoader from "react-content-loader";

export const SkeletonText = (props) => (
  <ContentLoader
    speed={1}
    width={221}
    height={20}
    viewBox="0 0 221 20"
    backgroundColor="#f3f3f3"
    foregroundColor="#efebeb"
    {...props}
  >
    <rect x="1" y="1" rx="5" ry="5" width="221" height="20" />
  </ContentLoader>
);
