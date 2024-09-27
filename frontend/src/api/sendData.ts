import type { IPayment } from './../intefaces';
import axios from 'axios';
 
const url = 'http://localhost:3000' 

export async function sendData(data: IPayment):Promise<string> {
  var result:string = ''
  await axios.post(url, data, {}).then((res) => result = res.data)
  console.log(result)
  return result
}