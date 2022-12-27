export function generateImageKitURL(googleCloudURL: string) {
    const truncateIdx = googleCloudURL.indexOf("/o/");
    return (
        "https://ik.imagekit.io/7baq1npw1/" +
        googleCloudURL.substring(truncateIdx)
    );
}

export function generateSrcSet(url: string) {
    return `${url}&tr=w-300,dpr-${window.devicePixelRatio} 300w,
    ${url}&tr=w-420,dpr-${window.devicePixelRatio} 420w,
    ${url}&tr=w-540,dpr-${window.devicePixelRatio} 540w
    ${url}&tr=w-660,dpr-${window.devicePixelRatio} 660w`;
}

export const idealSizes =
    "(max-width: 400px) 100vw, (max-width: 700px) 50vw, (max-width: 900px) 33vw, 300px";
