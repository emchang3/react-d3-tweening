import { isEqual } from 'lodash';
import { useEffect, useState } from 'react';
import * as React from 'react';

import {
  DataContext,
  RadialContext,
  SliceContext,
  SocketContext,
  TargetsContext
} from './contexts';

import socket from './socket';

import { MultiContextProvider } from './multi-context-provider';
import { PieChart } from './charts/pieChart';

import { redistribute, setRadius } from './animations';

export enum RadialAction {
  GROW = 'grow',
  SHRINK = 'shrink'
}

export const App = () => {
  const [data, setData] = useState([4, 8, 12, 16, 20]);
  const [targets, setTargets] = useState([4, 8, 12, 16, 20]);
  const [currentSlice, setCurrentSlice] = useState(null);
  const [radii, setRadii] = useState([1, 1, 1, 1, 1]);
  const [radialTargets, setRadialTargets] = useState([1, 1, 1, 1, 1]);
  const [radialTweener, setRadialTweener] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    socket.on('data', (data: number[]) => {
      setTargets(data)
    });
  }, []);

  useEffect(() => {
    if (socket.connected) {
      setSocketConnected(true);
    }
  });

  useEffect(() => {
    if (isEqual(data, targets)) {
      return;
    }

    redistribute(data, setData, targets);
  }, [targets]);

  useEffect(() => {
    const radialTargets = [1, 1, 1, 1, 1];
    if (currentSlice !== null) {
      radialTargets[currentSlice] = 1.1;
    }

    setRadialTargets(radialTargets);
  }, [currentSlice]);

  useEffect(() => {
    const rt = setRadius(radii, setRadii, radialTargets);

    clearInterval(radialTweener);

    setRadialTweener(rt);
  }, [radialTargets]);

  const contexts = [
    { context: DataContext, value: data },
    { context: TargetsContext, value: targets },
    { context: RadialContext, value: radii },
    { context: SliceContext, value: { currentSlice, setCurrentSlice } },
    { context: SocketContext, value: socketConnected }
  ];

  return (
    <MultiContextProvider contexts={contexts}>
      <div className="app">
        <div className="middle">
          <div className="inner">
            <PieChart
              id="myPieChart"
              width={420}
              height={420}
            />
          </div>
        </div>
      </div>
    </MultiContextProvider>
  );
};
