import * as React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { fullScreenPlugin } from '@react-pdf-viewer/full-screen';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


interface FullScreenButtonExampleProps {
    fileUrl: string;
}

const FullScreenButtonExample: React.FC<FullScreenButtonExampleProps> = ({ fileUrl }) => {
    const fullScreenPluginInstance = fullScreenPlugin();
    const { EnterFullScreenButton } = fullScreenPluginInstance;

    React.useEffect(() => {
        console.log(`File URL: ${fileUrl}`);
    }, [fileUrl]);

    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        toolbarPlugin: {
            fullScreenPlugin: {
                // Zoom to fit the screen after entering and exiting the full screen mode
                onEnterFullScreen: (zoom) => {
                    zoom(SpecialZoomLevel.PageFit);
                },
                onExitFullScreen: (zoom) => {
                    zoom(SpecialZoomLevel.PageFit);
                },
            },
        },
    });

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`}>
                <div className='worker'>
                    <div style={{ width: '100%', height: '100%' }}>
                        <Viewer fileUrl={fileUrl} plugins={[defaultLayoutPluginInstance]} />
                    </div>
                </div>
            </Worker>
        </div>
    );
};

export default FullScreenButtonExample;
