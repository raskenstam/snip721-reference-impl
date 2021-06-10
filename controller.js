//TODO  SAVE AND USE PROXYDATA
const fs = require('fs')
let path = './accountinfo.json'
const storeData = (data, path) => {
    try {
        fs.writeFileSync(path, JSON.stringify(data))
    } catch (err) {
        console.error(err)
    }
}
const loadData = (path) => {
    try {
        return JSON.parse(fs.readFileSync(path, 'utf8'))
    } catch (err) {
        console.error(err)
        return false
    }
}
console.log("print")
exports.loadData = loadData
exports.pushstoredata = async function upsertRow(obj) {
    let a = loadData(path)
    a.data.push(obj)
    console.log(a);
    storeData(a, path)
}
exports.storeData = async function load() {
    loadData(path);
}

