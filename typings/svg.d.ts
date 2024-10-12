/**
 * This file is needed to prevent Typescript from screaming since the actual Icon component
 * implementation will not be available until compile time by react-native-svg-transformer
 *
 * Please do not add any ambient typing here
 */
declare module '*.svg' {
    import React from 'react';
    import { SvgViewProps } from 'react-native-svg';

    const content: React.FC<SvgViewProps>;
    // eslint-disable-next-line
    export default content;
}
