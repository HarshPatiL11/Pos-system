import itemModel from "../Model/itemModel";

export const registerItem = async (req, res) => {
    try {
        const { name, price, category, image } = req.body;

        // Validate the input fields
        if (!name) return res.status(400).json({ error: "Name is required" });
        if (!price) return res.status(400).json({ error: "Price is required" });
        if (!category) return res.status(400).json({ error: "Category is required" });
        if (!image) return res.status(400).json({ error: "Image is required" });

         // Check if an item with the same name exists in the same category
         const existingItem = await itemModel.findOne({ name, category });
         if (existingItem) {
             return res.status(400).json({ error: "Item with the same name already exists in this category" });
         }
 
        // Create a new item
        const newItem = new itemModel({
            name,
            price,
            category,
            image,
        });

        // Save the item to the database
        await newItem.save();

        // Respond with success
        res.status(201).json({ message: "Item registered successfully", item: newItem });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ error: "An error occurred while registering the item" });
    }
}

// get all items
export const getAllItems = async (req, res) => {
    try {
        const allItems = await itemModel.find();
        res.status(200).json(allItems);
    } catch (error) {
        console.error(`Error getting mobile phones: ${error}`);
        res.status(500).send("Internal Server Error");
    }
};


