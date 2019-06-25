import * as React from 'react';
import { useEffect, useState } from 'react';
import { isEqual } from 'lodash';

import { DataContext, TargetsContext, RadialContext, SliceContext, SocketContext } from './contexts';

import socket from './socket';

import { PieChart } from './charts/pieChart';

import { redistribute, setRadius } from './animations';
import { MultiContextProvider } from './multi-context-provider';

export enum RadialAction {
    GROW = 'grow',
    SHRINK = 'shrink'
}

export const App = () => {
    const [data, setData] = useState([ 4, 8, 12, 16, 20 ]);
    const [targets, setTargets] = useState([ 4, 8, 12, 16, 20 ]);
    const [currentSlice, setCurrentSlice] = useState(null);
    const [radii, setRadii] = useState([ 1, 1, 1, 1, 1 ]);
    const [radialTargets, setRadialTargets] = useState([ 1, 1, 1, 1, 1 ]);
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

    const getCurrentSlice = () => currentSlice;

    useEffect(() => {
        const radialTargets = [ 1, 1, 1, 1, 1 ];
        if (currentSlice !== null) {
            radialTargets[currentSlice] = 1.1;
        }

        setRadialTargets(radialTargets);
    }, [currentSlice]);

    useEffect(() => {
        const rt = setRadius(radii, setRadii, radialTargets);

        if (rt !== radialTweener) {
            clearInterval(radialTweener);

            setRadialTweener(rt);
        }
    }, [radialTargets]);

    const appStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    } as React.CSSProperties;

    const middleStyle = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    } as React.CSSProperties;

    const innerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    } as React.CSSProperties;

    const contexts = [
        { context: DataContext, value: data },
        { context: TargetsContext, value: targets },
        { context: RadialContext, value: radii },
        { context: SliceContext, value: { currentSlice, setCurrentSlice } },
        { context: SocketContext, value: socketConnected }
    ];

    return (
        <MultiContextProvider contexts={contexts}>
            <div style={appStyle}>
                <div style={middleStyle}>
                    <div style={{ ...innerStyle, paddingRight: '80px' }}>
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
