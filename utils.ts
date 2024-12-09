import axios from "axios";


export function testFn(number:number,callback:Function){
  if(number>5){
    callback(number)
  }
}

export async function request (){
  const {data}  =await axios.get('fake')
  return data
}
