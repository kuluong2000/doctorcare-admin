import React, { forwardRef, useState } from 'react';
// import classNames from "classnames/bind";
// import styles from "./image.module.scss";

import noImage from './../../../assets/images/noImage.png';

// const cx = classNames.bind(styles);

const Image = forwardRef(
  (
    { src, alt, className, fallback: customFallback = noImage, ...props },
    ref
  ) => {
    const [fallback, setFallback] = useState(' ');

    const handleError = () => {
      setFallback(customFallback);
    };

    return (
      <img
        ref={ref}
        src={src || fallback}
        alt={alt}
        className={className}
        {...props}
        onError={handleError}
      ></img>
    );
  }
);

export default Image;
