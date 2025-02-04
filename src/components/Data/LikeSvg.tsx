interface LikeIconProps{
    isLike: boolean,
    toggleIcon : () => void;
}

const LikeIcon: React.FC<LikeIconProps> = ({isLike, toggleIcon}) => {
    return (
        <svg onClick={toggleIcon}
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g clipPath="url(#clip0_1157_1868)">
            <path
                d="M15.525 5.38141C15.2058 5.06204 14.8268 4.80869 14.4096 4.63584C13.9924 4.46299 13.5453 4.37402 13.0938 4.37402C12.6422 4.37402 12.1951 4.46299 11.7779 4.63584C11.3608 4.80869 10.9817 5.06204 10.6625 5.38141L10 6.04391L9.33751 5.38141C8.69271 4.73661 7.81816 4.37436 6.90626 4.37436C5.99437 4.37436 5.11982 4.73661 4.47501 5.38141C3.83021 6.02622 3.46796 6.90077 3.46796 7.81266C3.46796 8.72456 3.83021 9.59911 4.47501 10.2439L10 15.7689L15.525 10.2439C15.8444 9.92469 16.0977 9.54567 16.2706 9.12851C16.4434 8.71135 16.5324 8.26422 16.5324 7.81266C16.5324 7.36111 16.4434 6.91398 16.2706 6.49682C16.0977 6.07966 15.8444 5.70064 15.525 5.38141Z"
                stroke={isLike ? "red" : "#8D8D8D"}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </g>
        <defs>
            <clipPath id="clip0_1157_1868">
                <rect width="15" height="15" fill="white" transform="translate(2.5 2.5)" />
            </clipPath>
        </defs>
    </svg>
    )
}

export default LikeIcon;