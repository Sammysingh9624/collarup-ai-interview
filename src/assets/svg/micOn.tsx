const MicOn = () => {
    return (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_207_6790)">
                <circle cx="28" cy="26" r="20" fill="white" />
            </g>
            <rect x="25.5" y="16.375" width="5" height="11" rx="2.5" stroke="#06000D" />
            <path
                d="M21 24V25C21 28.866 24.134 32 28 32C31.866 32 35 28.866 35 25V24"
                stroke="#06000D"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path d="M28 32V36M28 36H25M28 36H31" stroke="#06000D" stroke-linecap="round" stroke-linejoin="round" />
            <defs>
                <filter
                    id="filter0_d_207_6790"
                    x="0"
                    y="0"
                    width="56"
                    height="56"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="4" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_207_6790" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_207_6790" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default MicOn;
