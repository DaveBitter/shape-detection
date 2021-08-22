// Libs
import React, { useEffect, useRef, useState } from 'react';
// import ReactJson from 'react-json-view'

// Utils

// Resources

// Components

// Interface
// interface IProps { }

// @ts-ignore
let ReactJsonView: any;

// Component
const Home = () => {
    (async () => {
        ReactJsonView = (await import('react-json-view')).default;
    })();

    // @ts-ignore
    const canView = typeof window !== 'undefined' && !!window.FaceDetector;

    /*** Face Detection ***/
    const [facesImageSrc, setFacesImageSrc] = useState<string>('/static/img/rolling-stones.jpg');
    const [facesJson, setFacesJson] = useState<any>();
    const facesImage = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        setFacesJson(null);

        setTimeout(() => {
            // @ts-ignore
            if (window.FaceDetector) {
                // @ts-ignore
                const faceDetector = new window.FaceDetector();

                faceDetector.detect(facesImage.current)
                    .then((faces: any) => {
                        setFacesJson(faces);
                    }).catch(console.error);
            }
        }, 100);
    }, [facesImageSrc]);

    /*** Barcode Detection ***/
    const [barcodesImageSrc, setBarcodesImageSrc] = useState<string>('/static/img/barcode.png');
    const [barcodesJson, setBarcodesJson] = useState<any>();
    const barcodesImage = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        setBarcodesJson(null);

        setTimeout(() => {
            // @ts-ignore
            if (window.BarcodeDetector) {
                // @ts-ignore
                const barcodeDetector = new window.BarcodeDetector();

                barcodeDetector.detect(barcodesImage.current)
                    .then((barcodes: any) => {
                        setBarcodesJson(barcodes);
                    }).catch(console.error);
            }
        }, 100);
    }, [barcodesImageSrc]);

    /*** Text Detection ***/
    const [textImageSrc, setTextImageSrc] = useState<string>('/static/img/text.png');
    const [textJson, setTextJson] = useState<any>();
    const textImage = useRef<HTMLImageElement | null>(null);

    useEffect(() => {
        setTextJson(null);

        setTimeout(() => {
            // @ts-ignore
            if (window.TextDetector) {
                // @ts-ignore
                const textDetector = new window.TextDetector();

                textDetector.detect(textImage.current)
                    .then((text: any) => {
                        setTextJson(text);
                    }).catch(console.error);
            }
        }, 100);
    }, [textImageSrc]);

    if (!canView) {
        return <article><h1>You need to enable use Chrome and enable Experimental Web Platform features to view this demo</h1></article>;
    }

    return <article>
        <h1>Shape Detection API demo</h1>

        <section>
            <h2>Face Detection API</h2>
            <img ref={facesImage} src={facesImageSrc} />
            <input value={facesImageSrc} onChange={(e) => setFacesImageSrc(e.target.value)}></input>
            {facesJson && <>
                <label>Result</label>
                <ReactJsonView src={facesJson} collapsed={true} />
            </>}
        </section>

        <section>
            <h2>Barcode Detection API</h2>
            <img ref={barcodesImage} src={barcodesImageSrc} />
            <input value={barcodesImageSrc} onChange={(e) => setBarcodesImageSrc(e.target.value)}></input>
            {barcodesJson && <>
                <label>Result</label>
                <ReactJsonView src={barcodesJson} collapsed={true} />
            </>}
        </section>

        <section>
            <h2>Text Detection API</h2>
            <img ref={textImage} src={textImageSrc} />
            <input value={textImageSrc} onChange={(e) => setTextImageSrc(e.target.value)}></input>
            {textJson && <>
                <label>Result</label>
                <ReactJsonView src={textJson} collapsed={true} />
            </>}
        </section>
    </article>;
};

// Props
Home.defaultProps = {};

export default Home;
