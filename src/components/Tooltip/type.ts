import type {Placement} from "@popperjs/core";

export interface TooltipProps{
    content?:string;
    placement?:Placement;
    trigger?:'hover' | 'click';
    manual?:boolean;
}

export interface TooltipEmits{
    (e:'visible-change',value:boolean):void
}

export interface TooltipInstance {
    show:()=>void;
    hide:()=>void;
}
