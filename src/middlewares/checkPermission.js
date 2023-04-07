// B1: Kiểm tra xem user đã đăng nhập chưa?
// B2: Kiểm xem token có đúng hay không?
// B3: Giải mã token và tìm user trong db dựa theo id
// B4: Kiểm tra user đấy có phải là admin không? nếu không phải cút
// B5: Cho phép đi tiếp
import jwt from "jsonwebtoken";
import User from "../models/user";
export const checkPermission = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(403).json({
        message: "Bạn chưa đăng nhập",
      });
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const { id } = jwt.verify(token, "thayDatAhii");
    const user = await User.findById(id);
    console.log(user);
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Không phận sự miễn động chạm",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message || "Token không hợp lệ",
    });
  }
};
