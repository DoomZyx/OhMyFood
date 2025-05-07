const mongoose = require('mongoose');

// Collection pour stocker les compteurs
const CounterSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('Counter', CounterSchema);

// Fonction pour obtenir le prochain ID
async function getNextSequence(sequenceName) {
    const result = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { seq: 1 } },
        { 
            new: true,
            upsert: true // Crée le document s'il n'existe pas
        }
    );
    return result.seq;
}

// Fonction pour initialiser un compteur avec une valeur spécifique
async function initializeCounter(sequenceName, initialValue) {
    await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { seq: initialValue },
        { upsert: true }
    );
}

module.exports = {
    getNextSequence,
    initializeCounter
}; 