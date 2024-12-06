import { Schema, model, Document} from 'mongoose';

interface IDrinks extends Document {
    name: string;
    ingredients: string[];
}

const drinkSchema = new Schema<IDrinks>({
    name: { type: String, required: true },
    ingredients: [{type: String, required: true}]
})

const Drink = model('Drink', drinkSchema);

export default Drink;