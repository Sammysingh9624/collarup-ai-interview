/** @type {import('tailwindcss').Config} */

import { BG_IMG } from './src/constant/tailwind/backGroundImages.constants';
import { BOX_SHADOWS } from './src/constant/tailwind/boxShadows.constants';
import { COLORS } from './src/constant/tailwind/colors.constants';
import { DROP_SHADOWS } from './src/constant/tailwind/dropShadows.constants';
import { FONT_SIZE } from './src/constant/tailwind/fonts.constants';
import { SCREENS } from './src/constant/tailwind/screens.constants';
import { WIDTHS } from './src/constant/tailwind/widths.constants';

export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            backgroundImage: {
                ...BG_IMG,
            },
            screens: {
                ...SCREENS,
            },
            fontSize: {
                ...FONT_SIZE,
            },
            colors: {
                ...COLORS,
            },
            boxShadow: {
                ...BOX_SHADOWS,
            },
            dropShadow: {
                ...DROP_SHADOWS,
            },
            width: {
                ...WIDTHS,
            },
            maxWidth: {
                ...WIDTHS,
            },
            animation: {
                scaleUp4: 'scaleUp4 1s linear infinite',
            },
            keyframes: {
                scaleUp4: {
                    '20%': { transform: 'scaleY(0.2)' },
                    '40%': { transform: 'scaleY(1)' },
                },
            },
        },
    },
    plugins: [],
};
