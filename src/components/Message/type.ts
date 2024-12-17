import type {VNode} from "vue";
export interface  MessageProps {
  content?:string | VNode;
  duration?:number;
  type?:'info' | 'success' | 'warning' | 'error';
  showClose?:boolean; //控制关闭按钮的显示隐藏;
  onDestroy:() => void;
  offset?:number
}

//包含多个Message实例的数组
export interface  MessageContext {
  id:string
  props:MessageProps
  vNode:VNode
}

//创建忽略onDestroy的MessageProps
export type createMessageProps = Omit<MessageProps,'onDestroy'>