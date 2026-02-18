import * as dicomParser from 'dicom-parser';
import * as THREE from 'three';

export interface LoadedDicom {
    texture: THREE.CanvasTexture;
    sopInstanceUid: string;
    rows: number;
    cols: number;
}

export async function loadDicom(url: string): Promise<LoadedDicom> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const byteArray = new Uint8Array(arrayBuffer);

    const dataSet = dicomParser.parseDicom(byteArray);

    const rows = dataSet.int16('x00280010') || 0;
    const cols = dataSet.int16('x00280011') || 0;
    const pixelDataElement = dataSet.elements['x7fe00010'];

    if (!pixelDataElement) {
        throw new Error('No pixel data found in DICOM file');
    }

    const pixelData = new Uint16Array(
        arrayBuffer,
        pixelDataElement.dataOffset,
        pixelDataElement.length / 2
    );

    // Calculate tighter windowing for better contrast
    // Find robust min/max (ignoring potential outliers or noise)
    const sortedPixels = [...pixelData].sort((a, b) => a - b);
    const p5 = sortedPixels[Math.floor(pixelData.length * 0.05)];
    const p95 = sortedPixels[Math.floor(pixelData.length * 0.95)];

    const windowCenter = (p95 + p5) / 2;
    const windowWidth = (p95 - p5) || 1;

    // Map to 8-bit for canvas display
    const canvas = document.createElement('canvas');
    canvas.width = cols;
    canvas.height = rows;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');

    const imageData = ctx.createImageData(cols, rows);
    const data = imageData.data;

    for (let i = 0; i < pixelData.length; i++) {
        const val = pixelData[i];
        // Standard DICOM windowing formula
        let gray = ((val - (windowCenter - 0.5)) / (windowWidth - 1) + 0.5) * 255;
        gray = Math.min(Math.max(gray, 0), 255);

        const idx = i * 4;
        data[idx] = gray;     // R
        data[idx + 1] = gray; // G
        data[idx + 2] = gray; // B
        data[idx + 3] = 255;  // A
    }

    ctx.putImageData(imageData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    return {
        texture,
        sopInstanceUid: dataSet.string('x00080018') || '',
        rows,
        cols
    };
}
