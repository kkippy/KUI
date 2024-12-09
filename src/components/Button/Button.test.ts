import {describe,test,expect} from "vitest";
import Button from "./Button.vue"
import {mount} from "@vue/test-utils";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import Icon from "../Icon/icon.vue"


describe('Button test' ,()=>{
    test('button function' ,()=>{
        //mount接受的第一个参数为组件名称，第二个参数是具体的内容
        const wrapper = mount(Button,{
            props:{
                type:'primary'
            },
            slots:{
                default:'button按钮'
            }
        });
        expect(wrapper.classes()).toContain('k-button--primary') // 判断是否包含某个class
        // console.log(wrapper.html())

        //slot测试
        //使用get方法获取元素，find方法也能实现，但是find如果找不到元素的话不会报错，get则会。
        // expect(wrapper.find('button').text()).toBe('button按钮')
        //get方法类似与querySelect，text方法是获取元素的文本内容
        expect(wrapper.get('button').text()).toBe('button按钮')

        //事件测试
        wrapper.get('button').trigger('click')
        // console.log('wrapper.emitted()',wrapper.emitted())
        expect(wrapper.emitted()).toHaveProperty('click') // 判断是否触发了click事件
    })

    test('button disabled',()=>{
        const wrapper = mount(Button,{
            props:{
                disabled:true
            },
            slots:{
                default:'disabled'
            }
        })

        //attributes获取元素的属性,toBeDefined判断属性是否存在
        //或者先获取到元素后使用element属性直接获取到元素的disabled属性，再去判断是否存在
        expect(wrapper.attributes('disabled')).toBeDefined()
        expect(wrapper.get('button').element.disabled).toBeDefined()
        wrapper.get('button').trigger('click') // disabled元素不会触发click事件
        expect(wrapper.emitted()).not.toHaveProperty('click')

    })

    test('icon',()=>{
        const wrapper = mount(Button,{
            props:{
                icon:'search'
            },
            slots:{
                default:'icon'
            },
            global:{
                //在stubs数组中填写要模拟的组件名称
                stubs:['FontAwesomeIcon']
            }
        })

        const icon = wrapper.findComponent(FontAwesomeIcon)
        expect(icon.exists()).toBe(true)
        expect(icon.attributes('icon')).toBe('search')
    })

    test('loading',()=>{
        const wrapper = mount(Button,{
            props:{
                loading:true
            },
            slots:{
                default:'loading'
            },
            global:{
                //在stubs数组中填写要模拟的组件名称
                stubs:['Icon']
            }
        })
        console.log(wrapper.html())
        const loading = wrapper.findComponent(Icon)
        expect(loading.exists()).toBe(true)
        expect(wrapper.attributes('disabled')).toBeDefined()

    })
})
