import React, { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import '../assets/Styles/components/WebcamCapture.scss';

const WebcamCapture = ({ setImage, webcamRef }) => {
  const localWebcamRef = useRef(null);

  useEffect(() => {
    if (webcamRef) {
      webcamRef.current = localWebcamRef.current;
    }
  }, [webcamRef]);

  return (
    <div className='webcam-div'>
      <Webcam
        audio={false}
        ref={localWebcamRef}
        screenshotFormat="image/jpeg"
        height={'100%'}
      />
    </div>
  );
};

export default WebcamCapture;