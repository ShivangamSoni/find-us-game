import { generateSrcSet, idealSizes } from "../../utils/ImageKit";

interface Props
    extends Omit<
        React.DetailedHTMLProps<
            React.ImgHTMLAttributes<HTMLImageElement>,
            HTMLImageElement
        >,
        "srcSet" | "sizes"
    > {
    src: string;
    alt: string;
}

export default function ImageKitImg({ src, alt, ...rest }: Props) {
    return (
        <img
            src={src}
            srcSet={generateSrcSet(src)}
            sizes={idealSizes}
            alt={alt}
            {...rest}
        ></img>
    );
}
