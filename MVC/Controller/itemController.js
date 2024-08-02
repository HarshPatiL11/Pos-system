import fs from 'fs';
import Item from '../Model/itemModel.js'; // Ensure this path is correct

export const createItemController = async (req, res) => {
    try {
        const { name, price, category } = req.fields; // Added price and category
        const { image } = req.files;

        // Validations
        if (!name) return res.status(400).send({ error: 'Name is required' });
        if (price === undefined) return res.status(400).send({ error: 'Price is required' });
        if (price < 0) return res.status(400).send({ error: 'Price must be a positive number' }); // Optional: Price validation
        if (!category) return res.status(400).send({ error: 'Category is required' });
        if (image && image.size > 1000000) return res.status(400).send({ error: 'Image should be less than 1 MB' });

        const item = new Item({
            name,
            price, // Added price
            category, // Added category
        });

        if (image) {
            item.image.data = fs.readFileSync(image.path);
            item.image.contentType = image.type;
        }

        await item.save();
        res.status(201).send({
            status: true,
            message: 'Item created successfully',
            item,
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

// get AllItem Controller
export const getAllItemController = async (req, res) => {
    try {
        const items = await Item.find();

        // Convert image data to base64
        const itemsWithImages = items.map(item => {
            const image = item.image.data
                ? `data:${item.image.contentType};base64,${item.image.data.toString('base64')}`
                : null;

            return {
                ...item._doc,
                image,
            };
        });

        res.status(200).json(itemsWithImages);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

// Get a single item by ID
export const getItemByNameController = async (req, res) => {
    try {
        const itemName = req.params.name;

        const item = await Item.findOne({ name: itemName });

        if (!item) return res.status(404).send({ error: 'Item not found' });

        const image = item.image.data
            ? `data:${item.image.contentType};base64,${item.image.data.toString('base64')}`
            : null;

        res.status(200).json({
            ...item._doc,
            image
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};
