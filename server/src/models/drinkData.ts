import { Schema, model, Document, ObjectId } from 'mongoose';

interface IDrinks extends Document {
    id: ObjectId;
    name: string;
    ingredients: string[];
}

//creating to generate id's as drinks are added
const mongoose = require('mongoose');

const drinkSchema = new Schema<IDrinks>({
    id: {type: mongoose.Schema.Types.ObjectId, required: true},
    name: { type: String, required: true },
    ingredients: [{type: String, required: true}]
})

const Drink = model('Drink', drinkSchema);

export default Drink;