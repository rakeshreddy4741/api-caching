const Product = require("../models/Products");
const redisClient = require('../config/redis');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price } = req?.body;
        

        if (!name || !price) {
            return res.status(400).json({ message: "Name and price are required" });
        }

        const product = await Product.create({ name, description, price });

        await redisClient.del('/api/products/');
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        console.log("Fetching products from database");
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        if (!req?.params?.id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const product = await Product.findById(req?.params?.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { name, description, price } = req?.body;

        if (!req?.params?.id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        if (!name || !price) {
            return res.status(400).json({ message: "Name and price are required" });
        }

        const product = await Product.findByIdAndUpdate(req?.params?.id, { name, description, price }, { new: true });

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await redisClient.del('/api/products/');
        await redisClient.del(`/api/products/${req?.params?.id}`);

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        if (!req?.params?.id) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        const product = await Product.findByIdAndDelete(req?.params?.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        await redisClient.del('/api/products/');
        await redisClient.del(`/api/products/${req?.params?.id}`);

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
