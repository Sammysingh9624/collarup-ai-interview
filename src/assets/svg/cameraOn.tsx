const CameraOn = () => {
    return (
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_207_6793)">
                <circle cx="28" cy="26" r="20" fill="white" />
            </g>
            <path
                d="M31 26V30.4C31 30.7314 30.7314 31 30.4 31H19.6C19.2686 31 19 30.7314 19 30.4V21.6C19 21.2686 19.2686 21 19.6 21H30.4C30.7314 21 31 21.2686 31 21.6V26ZM31 26L36.0159 21.8201C36.4067 21.4944 37 21.7723 37 22.281V29.719C37 30.2277 36.4067 30.5056 36.0159 30.1799L31 26Z"
                stroke="#06000D"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <defs>
                <filter
                    id="filter0_d_207_6793"
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
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_207_6793" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_207_6793" result="shape" />
                </filter>
            </defs>
        </svg>
    );
};

export default CameraOn;
