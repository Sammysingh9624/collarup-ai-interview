import React from 'react';
import CrossIcon from '../../assets/svg/cross-icon';
import { getRandomLightColor } from '../../utils/helper';

export enum BadgeStatus {
    SUCCESS = 'success',
    INFO = 'info',
    ALERT = 'alert',
    WARNING = 'warning',
}

interface Props {
    value: string;
    onremove?: () => void;
    showIcon?: boolean;
    className?: string;
    type?: BadgeStatus;
    backgroundColor?: string;
}

const Badge: React.FC<Props> = ({
    value,
    onremove,
    className = '',
    type = BadgeStatus.SUCCESS,
    backgroundColor = getRandomLightColor(),
}) => {
    return type ? (
        <div
            className={`flex justify-between items-center gap-4 p-1 px-2 rounded-md  border-none w-max content-2 capitalize text-black-600 ${
                className ?? ''
            }`}
            style={{ background: backgroundColor }}
        >
            {value}
            {onremove && (
                <div onClick={onremove} className="cursor-pointer">
                    <CrossIcon />
                </div>
            )}
        </div>
    ) : (
        '-'
    );
};

export default Badge;
