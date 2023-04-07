import Joi from "joi";
import Category from "../models/category";
import Product from "../models/product";

const categorySchema = Joi.object({
  name: Joi.string().required(),
});

export const getAll = async (req, res) => {
  try {
    const data = await Category.find();
    if (data.length == 0) {
      return res.json({
        messeage: "Không có danh mục nào",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(400).json({
      messeage: error,
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id).populate("products");
    if (category.length === 0) {
      return res.status(200).json({
        messeage: "Không có danh mục",
      });
    }
    return res.status(200).json(category);
  } catch (error) {
    return res.status(400).json({
      messeage: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Category.findByIdAndDelete(req.params.id);
    return res.json({
      messeage: "Da xoa thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      messeage: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = categorySchema.validate(body);
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.json({
        messeage: errors,
      });
    }

    const data = await Category.create(body);
    if (data.length === 0) {
      return res.status(400).json({
        messeage: "Thêm danh mục thành công",
      });
    }
    return res.status(200).json({
      messeage: "Them thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      messeage: error,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      return res.status(400).json({
        messeage: "update danh mục thất bại",
      });
    }
    return res.status(200).json({
      messeage: "update thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      messeage: error,
    });
  }
};
