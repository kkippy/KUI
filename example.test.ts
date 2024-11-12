import {test,expect,describe,vi} from 'vitest'
import { testFn } from "./utils"

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
})

