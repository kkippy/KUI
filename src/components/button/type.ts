export type ButtonType = 'primary' | 'success' | 'info' | 'warning' | 'danger'
export type ButtonSize = 'large' | 'default' | 'small'
export type NativeButtonType = 'button' | 'submit' | 'reset'
export interface ButtonProps {
    type?: ButtonType
    size?: ButtonSize
    plain?: boolean //样式的不同展现模式
    round?: boolean
    circle?: boolean
    disabled?: boolean,
    nativeType?: NativeButtonType,
    autoFocus?: boolean,
}

export interface ButtonInterface {
    ref:HTMLButtonElement
}