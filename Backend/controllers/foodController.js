import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add a food item
const addFood = async (req, res) => {
    const image_filename = req.file.filename;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food item added successfully" });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error adding food item" });
    }
};

// Get list of food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error fetching food list" });
    }
};

// remove food item
const removeFood = async (req, res) => {
    try {
        const foodId = req.body.id;
        const food = await foodModel.findById(foodId);

        if (!food) {
        return res.json({ success: false, message: "Food item not found" });
        }

        fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) {
            console.error("Failed to delete image file:", err);
        }
        });

        await foodModel.findByIdAndDelete(foodId);
        res.json({ success: true, message: "Food item removed successfully" });
    } 
    catch (error) {
        console.error(error);
        res.json({ success: false, message: "Error removing food item" });
    }
};


export { addFood, listFood, removeFood};
