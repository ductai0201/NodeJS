import Joi from "joi";
import Product from "../models/product";
import Category from "../models/category";

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  image: Joi.string(),
  description: Joi.string(),
  categoryId: Joi.string().required(),
});

export const getAll = async (req, res) => {
  const {
    _sort = "createdAt",
    _order = "asc",
    _limit = 10,
    _page = 1,
  } = req.query;
  //use computed property name sort
  const options = {
    page: _page,
    limit: _limit,
    sort: {
      [_sort]: _order === "desc" ? -1 : 1,
    },
  };
  try {
    const data = await Product.paginate({}, options);
    if (data.length == 0) {
      return res.json({
        messeage: "khong co san pham nao",
      });
    }
    return res.json(data);
  } catch (error) {
    return res.status(400).json({
      messeage: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Product.findById(id).populate("categoryId");
    if (data.length === 0) {
      return res.status(200).json({
        messeage: "khong co san pham",
      });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json({
      messeage: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const data = await Product.findByIdAndDelete(req.params.id);
    return res.json({
      messeage: "Da xoa thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      messeage: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const body = req.body;
    const { error } = productSchema.validate(body,{abortEarly:false});
    if (error) {
      return res.json({
        messeage: error.details.map((err) => err.message),
      });
    }

    const product = await Product.create(body);
    if (product.length === 0) {
      return res.status(400).json({
        messeage: "them san pham that bai",
      });
    }
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        products: product._id,
      },
    });

    // Trước khi sản phẩm được thêm thành công , cần thêm objectId của product vào category
    // + category sẽ tìm và update products mặc định mảng rỗng và thêm 1 object vào đó bằng cách tìm trong product có categoryId giống category thì sẽ được thêm vào

    return res.status(200).json({
      messeage: "Them thanh cong",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      messeage: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const data = product.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      return res.status(400).json({
        messeage: "update san pham that bai",
      });
    }
    return res.status(200).json({
      messeage: "update thanh cong",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      messeage: error.message,
    });
  }
};
