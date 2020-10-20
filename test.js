function test1() {
    console.log(1)
}
function test2() {
    console.log(2);
}
async function test3() {
    console.log(3)
    await test1()
    await test2()
    console.log(4);
}
test3()
console.log(5);