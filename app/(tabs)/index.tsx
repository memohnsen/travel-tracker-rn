import { StatesDetails } from '@/components/StatesDetails';
import { states } from '@/utils/states';
import { BlurView } from 'expo-blur';
import { GlassView } from 'expo-glass-effect';
import { AppleMaps, GoogleMaps } from 'expo-maps';
import { AppleMapsCircle } from 'expo-maps/build/apple/AppleMaps.types';
import { useCallback, useState } from 'react';
import { Platform } from "react-native";
import { createMMKV } from 'react-native-mmkv';
import {
  interpolateColor,
  runOnJS,
  useAnimatedReaction,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';


export const storage = createMMKV()

const COLOR_VISITED = '#00E676';
const COLOR_UNVISITED = '#FF1744';
const ANIMATION_DURATION_MS = 300;

/* Returns the fill color for a circle. If this circle is currently animating, interpolates between start and end color. */
function getCircleColor(
  stateId: string,
  isVisited: boolean,
  animatingStateId: string | null,
  animatingProgress: number,
  animatingFromVisited: boolean
): string {
  if (animatingStateId !== stateId) {
    return isVisited ? COLOR_VISITED : COLOR_UNVISITED;
  }
  return interpolateColor(
    /* progress 0 = start color, 1 = end color */
    animatingProgress,
    [0, 1],
    [
      animatingFromVisited ? COLOR_VISITED : COLOR_UNVISITED,
      animatingFromVisited ? COLOR_UNVISITED : COLOR_VISITED,
    ]
  );
}

export default function Index() {
  const [visitedStates, setVisitedStates] = useState<String[]>([]);
  const [animatingStateId, setAnimatingStateId] = useState<string | null>(null);
  const [animatingProgress, setAnimatingProgress] = useState(0);
  const [animatingFromVisited, setAnimatingFromVisited] = useState(false);

  const progressSv = useSharedValue(0);

  useAnimatedReaction(
    /* Whenever progressSv changes (every frame during the animation), copy it to React state so the map re-renders with the new color. 
    runOnJS is required because setState must run on the JS thread. */
    () => progressSv.value,
    (value) => {
      runOnJS(setAnimatingProgress)(value);
    }
  );

  const finalizeAnimation = useCallback((stateId: string, wasVisited: boolean) => {
    setVisitedStates((prev) =>
      wasVisited ? prev.filter((id) => id !== stateId) : [...prev, stateId]
    );
    setAnimatingStateId(null);
  }, []);

  const cameraPosition = {
    coordinates: {
      latitude: 39.833,
      longitude: -98.583,
    },
    zoom: Platform.OS === 'ios' ? 3.7 : 4.5
  }

  const markAsVisited = useCallback((tappedCircle: AppleMapsCircle) => {
    const stateId = tappedCircle.id;

    if (!stateId || animatingStateId !== null) {
      return;
    }

    const isVisited = visitedStates.includes(stateId);
    /* Record which circle is animating and direction; animate progressSv 0->1; when done, finalizeAnimation updates visitedStates. */
    setAnimatingStateId(stateId);
    setAnimatingFromVisited(isVisited);
    progressSv.value = 0;
    progressSv.value = withTiming(
      1,
      { duration: ANIMATION_DURATION_MS },
      (finished) => {
        if (finished) {
          runOnJS(finalizeAnimation)(stateId, isVisited);
        }
      }
    );
  }, [visitedStates, animatingStateId, progressSv, finalizeAnimation]);

  if (Platform.OS === 'ios') {
    // IOS VIEW
    return (
      <>
        <AppleMaps.View 
          style={{ flex: 1 }} 
          cameraPosition={cameraPosition}
          uiSettings={{
            myLocationButtonEnabled: false,
            togglePitchEnabled: false,
          }}
          properties={{
            isTrafficEnabled: false,
            selectionEnabled: false,
            isMyLocationEnabled: false,
          }}  
          onCircleClick={(e) => {
            markAsVisited(e)
          }}
          circles={
            states.map((state) => ({
              id: state.id,
              center: { latitude: state.latitude, longitude: state.longitude },
              radius: 60_000,
              color: getCircleColor(
                state.id,
                visitedStates.includes(state.id),
                animatingStateId,
                animatingProgress,
                animatingFromVisited
              ),
              lineColor: "black",
              lineWidth: 1,
            }))
          }
        />
        <GlassView
          style={{
            position: 'absolute',
            bottom: 120,
            padding: 16,
            borderRadius: 24,
            height: 104,
            width: '91.666%',
            alignSelf: 'center',
          }}
        >
          <StatesDetails visitedStates={visitedStates.map(state => state.toString())} />
        </GlassView>
      </>
    )
  } else {
    // ANDROID VIEW
    return (
      <>
        <GoogleMaps.View 
          style={{ flex: 1 }} 
          cameraPosition={cameraPosition}
          uiSettings={{
            myLocationButtonEnabled: false,
            togglePitchEnabled: false,
          }}
          properties={{
            isTrafficEnabled: false,
            selectionEnabled: false,
            isMyLocationEnabled: false,
            isBuildingEnabled: false,
          }}  
          onCircleClick={(e) => {
            markAsVisited(e)
          }}
          circles={
            states.map((state) => ({
              id: state.id,
              center: { latitude: state.latitude, longitude: state.longitude },
              radius: 60_000,
              color: getCircleColor(
                state.id,
                visitedStates.includes(state.id),
                animatingStateId,
                animatingProgress,
                animatingFromVisited
              ),
              lineColor: "black",
              lineWidth: 1,
            }))
          }
        />
        <BlurView
          intensity={130}
          tint="dark"
          style={{
            position: 'absolute',
            bottom: 120,
            padding: 16,
            borderRadius: 24,
            height: 104,
            width: '91.666%',
            alignSelf: 'center',
            overflow: 'hidden'
          }}
        >
          <StatesDetails visitedStates={visitedStates.map(state => state.toString())} />
        </BlurView>
      </>
    )
  }
}