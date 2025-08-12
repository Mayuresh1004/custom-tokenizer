import { Tiktoken } from 'js-tiktoken/lite';
import o200k_base from 'js-tiktoken/ranks/o200k_base';

const enc = new Tiktoken(o200k_base);

const userQuery = "Hey there I am Mayuresh Mhatre!"
const token = enc.encode(userQuery);

console.log(token);

const inputTokens = [
    
  25216, 1354,   357,
    939, 4273,  1609,
     71,  391, 13274,
    264,    0

]

const decoded = enc.decode(inputTokens);

console.log(decoded);
