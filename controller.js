const model = require('./database')

exports.saveallacc = async function getacc() {
    return await model.account.findAll()
}
exports.getproxies = async function prox() {
    let rox = await model.proxies.findAll()
    return await rox
}
exports.getproxiesPrimaryKey = async function prox(key) {
    let rox = await model.proxies.findByPk(key)
    return await rox
}
exports.getAccount = async function prox(id) {
    return await model.account.findByPk(id)
}
exports.pushstoredata = async function creatorupdate(acc) {
    return await model.account.upsert({
        name: acc.login, proxy: acc.proxy,
        pass: acc.pass, follow: acc.follow
    })
    /*return await model.account.upsert({
        name: acc.name, proxy: acc.proxy,
        email: acc.email, pass: acc.pass, follow: acc.follow
    })
    */
};

exports.getProxiesAccount = async function getProxiesAccount(id) {
    const controller = require('./controller')
    return await model.account.findAll({ where: { proxy: id } });
}

