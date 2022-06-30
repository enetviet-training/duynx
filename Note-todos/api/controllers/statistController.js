const Statist = require("../models/statistModel");

const printStatist = async () => {
    try {
        let statist = await Statist.findOne();
        console.log(statist);
    } catch (err) {
        throw err;
    }
}

exports.getStatist = async (req, res) => {
    try {
        let statist = await Statist.find();
        res.json(statist);
    } catch (err) {
        res.send(err);
    }
}

exports.increaseTodo = async (createdCount, completedCount) => {
    try {
        await Statist.updateOne(
            {},
            { $inc: { created: createdCount, completed: completedCount } },
            { upsert: true });
        printStatist();
    } catch (err) {
        throw err;
    }
}

exports.decreaseTodo = async (deletedCount) => {
    try {
        await Statist.updateOne({ $inc: { deleted: deletedCount } });
        printStatist();
    } catch (err) {
        throw err;
    }

}

exports.updateTodo = async (completedCount) => {
    try {
        await Statist.updateOne({ $inc: { completed: completedCount } });
        printStatist();
    } catch (err) {
        throw err;
    }
}
