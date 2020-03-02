function sleep(time) {
    return new Promise((r) => {
        setTimeout(() => {
            r()
        }, time * 1000)
    })
}

async function output() {
    let out = await sleep(1);
    console.log(1);
    return out;
}

output();