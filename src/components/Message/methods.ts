import type {createMessageProps} from "./type"
import {render,h} from "vue";
import MessageComponent from "./Message.vue"

export const createMessages = (prop:createMessageProps) => {
    //创建一个存放message的dom节点
    const container = document.createElement('div')
    //卸载消息组件
    const destory = () =>{
        render(null,container)
    }
    const newProps = {
        ...prop,
        onDestroy:destory
    }
    //创建vNode
    const vNode = h(MessageComponent,newProps)
    render(vNode,container)

    //将创建的dom节点添加到body中
    //这里的！是非空断言符，appendChild接收的是element类型，但是firstElementChild是element类型或者null的联合类型，所以使用！将其进行非空断言就可以解决类型报错问题
    document.body.appendChild(container.firstElementChild!)
}
