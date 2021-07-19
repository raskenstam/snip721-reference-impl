const model = require('./model')

exports.saveallacc = async function getacc() {
    let acc = await model.account.findAll()
    return await acc
}

exports.creatorupdate = async function creatorupdate(acc) {
    return await model.account.upsert({
        name: acc.name, proxy: acc.proxy,
        email: acc.email, pass: acc.pass, follow: acc.follow
    })
};
