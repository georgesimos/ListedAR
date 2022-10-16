import React, { useContext, useState } from 'react';
import {
  ViroAmbientLight,
  ViroARScene,
  ViroTrackingStateConstants,
  ViroSpotLight,
} from '@viro-community/react-viro';
import { Context as LocationContext } from '../../context/LocationContext';
import PlaceNodes from './PlaceNodes';
import usePlaces from '../../hooks/usePlaces';

const ArScene = () => {
  const [initialized, setInitialized] = useState(false);

  const {
    state: { initialLocation },
  } = useContext(LocationContext);

  const [places] = usePlaces();

  const onInitialized = state => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setInitialized(true);
    } else if (state === ViroTrackingStateConstants.TRACKING_NONE) {
      setInitialized(false);
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {initialized && (
        <>
          <PlaceNodes
            places={places}
            currentLocation={initialLocation}
            initialized={initialized}
          />
          <ViroAmbientLight color={'#aaaaaa'} />
          <ViroSpotLight
            innerAngle={5}
            outerAngle={90}
            direction={[0, -1, -0.2]}
            position={[0, 3, 1]}
            color="#ffffff"
            castsShadow={true}
          />
        </>
      )}
    </ViroARScene>
  );
};

export default ArScene;
