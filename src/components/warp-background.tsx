import { GrainGradient, type GrainGradientProps } from '@paper-design/shaders-react';

export default function WarpBackground(props: GrainGradientProps) {

    const defaultProps = {
        speed: 0.4,
        style: { width: '100%', height: '100%' }
    };

    if (typeof window === 'undefined') {
        const fallbackColor = props.colors?.[0] || '#09090b';
        return <div style={{ ...defaultProps.style, ...props.style, backgroundColor: fallbackColor }} />;
    }

    return <GrainGradient {...defaultProps} {...props} style={{ ...defaultProps.style, ...props.style }} />;

}