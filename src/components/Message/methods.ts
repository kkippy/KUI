import type {createMessageProps,MessageContext} from "./type"
import {render,h} from "vue";
import MessageComponent from "./Message.vue"

const instances:MessageContext[] = []
let seed = 1
export const createMessages = (prop:createMessageProps) => {
    //创建一个存放message的dom节点
    const container = document.createElement('div')
    const id = `message__${seed++}`
    //卸载消息组件
    const destory = () =>{
        //删除数组中的实例
        const index = instances.findIndex(instance => instance.id === id)
        if(index === -1) return
        instances.splice(index,1)
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

    const instance = {
        id,
        props:newProps,
        vNode
    }
    instances.push(instance)
    return instance
}

export const getLastInstance = () =>{
    return instances.at(-1)
}

export const getLastBottomOffset = () =>{
    // const lastInstance = getLastInstance()
    // return lastInstance ? lastInstance.props.offset : 20
    return 0
}
