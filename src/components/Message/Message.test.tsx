import {describe,expect,test,vi} from "vitest";
import {nextTick} from "vue";
import {createMessages,closeAll} from "./methods"

export const rAF =async ()=>{
    return new Promise((res) => {
        requestAnimationFrame(()=>{
            requestAnimationFrame(async ()=>{
                res(null)
                await nextTick()
            })
        })
    })
}

function getTop(el:Element){
    //获取元素的css值
    const styles = window.getComputedStyle(el)
    const top = styles.getPropertyValue('top')
    return Number.parseFloat(top)
}
describe("Message",()=>{
    test("调用createMessages方法，应创建出对应实例",async()=>{
        const instance = createMessages({
            content:"test",
            type:"success",
            duration: 0
        })
        await rAF()
        console.log(document.body.innerHTML)
        expect(document.querySelector('.k-message')).toBeTruthy()
        instance.destroy()
        await rAF()
        expect(document.querySelector('.k-message')).toBeFalsy()
    })

    test("多次调用方法，应创建出多个对应实例",async()=>{
       createMessages({content:"test", type:"success", duration: 0})
       createMessages({content:"test2", type:"danger", duration: 0})
        await rAF()
        expect(document.querySelectorAll('.k-message').length).toBe(2)
        closeAll()
        await rAF()
        expect(document.querySelectorAll('.k-message').length).toBe(0)
    })

    test("创建出多个实例应正确设置offset",async ()=>{
        createMessages({content:"test", type:"success", duration: 0,offset:50})
        createMessages({content:"test2", type:"danger", duration: 0,offset:100})
        await rAF()
        const els =document.querySelectorAll('.k-message')
        expect(els.length).toBe(2)
        const first = getTop(els[0])
        const second = getTop(els[1])
        // 在jsdom中，对应的height返回为0，这是用js所避免不了的问题
        expect(first).toBe(50)
        expect(second).toBe(150)
    })
})
