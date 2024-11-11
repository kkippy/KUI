import type {FontAwesomeIconProps} from "@fortawesome/vue-fontawesome";
export interface IconProps extends FontAwesomeIconProps {
    type?: 'primary' | 'success' | 'warning' | 'info' | 'danger';
    color?: string;
}
