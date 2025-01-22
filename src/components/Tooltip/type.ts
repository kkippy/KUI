import type {Placement,Options} from "@popperjs/core";

export interface TooltipProps{
    content?:string;
    placement?:Placement;
    trigger?:'hover' | 'click';
    manual?:boolean;
    popperOptions?:Partial<Options> ; //将Options类型中的必选项转换为可选项
    transition?:string;
    openDelay?:number;
    closeDelay?:number;
}

export interface TooltipEmits{
    (e:'visible-change',value:boolean):void,
    (e:'click-outside',value:boolean):void,
}

export interface TooltipInstance {
    show:()=>void;
    hide:()=>void;
}
