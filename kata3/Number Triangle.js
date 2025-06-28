// Write a function p that output
//
// 0
// 010
// 01210
// 0123210
// 012343210
// 01234543210
// 0123456543210
// 012345676543210
// 01234567876543210
// 0123456789876543210
// 01234567876543210
// 012345676543210
// 0123456543210
// 01234543210
// 012343210
// 0123210
// 01210
// 010
// 0
// Instructions
// Code must be less than or equal to 100 characters.
// 	Code can't contain any other numeric character except 1 and 0. That is characters 2 - 9 not allowed!
// That's all :)

p=_=>[...S='0'+(q=1111111101/0o11)+(1e10/10-1-q)].map(i=>S.slice(0,++i)+S.slice(10+10-i)).join`\n`


