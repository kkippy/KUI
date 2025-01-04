import {describe,expect,test,it} from "vitest";
import {mount} from "@vue/test-utils";
import Input from "./Input.vue"
describe('Input',()=>{
    it('基本展示',()=>{
        // 测试类名，样式是否正确展示
        const wrapper = mount(Input,{
            props:{
                type:'text',
                size:'small',
                modelValue:'hello',
            },
            slots:{
                prepend:'prepend',
                prefix:'prefix'
            }
        })
        console.log(wrapper.html())
        // 检测class是否达到预期
        expect(wrapper.classes()).toContain('k-input')
        expect(wrapper.classes()).toContain('k-input-small')
        expect(wrapper.classes()).toContain('is-prepend')

        expect(wrapper.find('input').exists()).toBeTruthy()
        expect(wrapper.get('input').attributes('type')).toBe('text')

        // 测试类名的时候需要加点
        expect(wrapper.find('.k-input_prepend').exists()).toBeTruthy()
        expect(wrapper.get('.k-input_prepend').text()).toBe('prepend')
        expect(wrapper.find('.k-input_prefix').exists()).toBeTruthy()
        expect(wrapper.get('.k-input_prefix').text()).toBe('prefix')
    })

    it('文本域情况',()=>{
        const wrapper2 = mount(Input,{
            props:{
                type:'textarea',
                size:'large',
                modelValue:'hello',
            },
            slots:{
                append:'append',
                suffix:'suffix'
            }
        })

        expect(wrapper2.find('textarea').exists()).toBeTruthy()

    })

    it('支持v-model',async ()=>{
        const wrapper3 = mount(Input,{
            props:{
                type:'text',
                modelValue:'hello',
                'onUpdate:modelValue':(e:any) => wrapper3.setProps({modelValue: e})
            }
        })
        // 初始值
        expect(wrapper3.find('input').element.value).toBe('hello')
        // 更新值
        await wrapper3.find('input').setValue('world')
        expect(wrapper3.find('input').element.value).toBe('world')
        expect(wrapper3.props('modelValue')).toBe('world')

        // 异步更新
        await wrapper3.setProps({modelValue:'async'})
        expect(wrapper3.find('input').element.value).toBe('async')
    })


})