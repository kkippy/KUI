import {defineComponent} from "vue";

const renderVNode = defineComponent({
    props:{
        vNode:{
            type:[String , Object],  //传入的vNode格式为字符串或对象类型的数组
            required:true
        }
    },
    setup(props){
        return () => props.vNode
    }
})

export default renderVNode
