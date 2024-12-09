import {test,expect,describe,vi,Mocked} from 'vitest'
import { testFn,request } from "./utils"
import axios from "axios";
vi.mock('axios')
//Mocked会接受一个泛型，表示被mock的模块的类型
const mockedAxios = axios as Mocked<typeof axios>

//expect断言的使用
test('common test',()=>{
  const name = 'krabby'
  expect(name).toBe('krabby')
  expect(2 + 2).not.toBe(0)
  expect(2 + 2).toBe(4)
})

// 真假的判断
test('toBeTruthy',()=>{
  expect(true).toBeTruthy()
  expect(1).toBeTruthy()
  expect('').toBeFalsy()
  expect(null).toBeFalsy()
  expect(undefined).toBeFalsy()
})

// 数字大小的判断
test('test number',()=>{
  expect(1).toBeLessThan(2)
  expect(1).toBeLessThanOrEqual(2)
  expect(2).toBeGreaterThan(1)
  expect(2).toBeGreaterThanOrEqual(1)
})

//对象的判断，注意要使用toEqual而不是toBe
test('object',()=>{
  const obj = {name:'krabby'}
  expect(obj).toEqual({name:'krabby'})
})

//describe将测试用例分组
describe('function test',()=>{
  test('callback test',()=>{
    // 使用vi生成mock函数
    const callback = vi.fn()
    testFn(10,callback)
    expect(callback).toHaveBeenCalled() //断言callback已经被调用了
    expect(callback).toHaveBeenCalledWith(10) //断言callback是被谁调用的
  })

  //监控对象上的方法
  test('spy on method',()=>{
    const  obj = {
      name:'krabby',
      getName(){
        return this.name
      }
    }
    const spy = vi.spyOn(obj,'getName')
    obj.getName()
    expect(spy).toHaveBeenCalledTimes(1) //断言getName方法被调用了1次
  })

  test('mock requset',async ()=>{
    //mockImplementation可以手动的设置mock函数的实现
    // mockedAxios.get.mockImplementation(()=>Promise.resolve({data:123}))
    mockedAxios.get.mockResolvedValue({data:123}) // mockResolvedValue是mockImplementation的简写,两者等价
    const result = await request()
    expect(result).toBe(123)
  })

})

