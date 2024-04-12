const OrderValid = require("../Utils/OrderValidation");
const OrderModel = require("../Models/OrderModel");

const DeleteOrder = async (req, res) => {
  console.log(req.params);
  let Order_ID = req.params.id;
  const deletedCourse = await OrderModel.findOneAndDelete({
    id: Order_ID,
  });
  console.log(deletedCourse);
  if (deletedCourse) {
    return res.status(200).json({
      msg: `Course ${Order_ID} Deleted Successfully`,
      data: deletedCourse,
    });
  } else {
    return res.status(200).json({
      msg: `Course ${Order_ID} Failed To Be Deleted`,
    });
  }
};
let GetAllOrders = async (req, res) => {
  let AllOrders = await OrderModel.find({});
  return res.json(AllOrders);
};

let GetOrderByID = async (req, res) => {
  let Order_ID = req.params.id;
  const Order = await OrderModel.find({
    id: Order_ID,
  });
  if (Order) {
    return res.status(200).json({ msg: "Order Found", data: Order });
  } else {
    return res.status(200).json({ msg: `Order ${Order_ID} Not Found` });
  }
};

let AddOrder = async (req, res) => {
  if (OrderValid(req.body)) {
    let newOrder = req.body;
    let Order = new OrderModel(newOrder);
    await Order.save();
    return res
      .status(200)
      .json({ msg: "Order Added Successfully", data: newOrder });
  } else {
    return res.status(404).json({
      Error: "Invalid Data",
      Description: `${OrderValid.errors[0].instancePath.split("/")[1]}: ${
        OrderValid.errors[0].keyword
      } ==> ${OrderValid.errors[0].message}`,
    });
  }
};

let UpdateOrder = async (req, res) => {
  if (OrderValid(req.body)) {
    let Order_ID = req.params.id;
    let UpdatedOrder = {
      id: req.body.id,
      totalprice: req.body.totalprice,
      items: req.body.items,
    };
    const Order = await OrderModel.findOneAndUpdate(
      { id: Order_ID },
      UpdatedOrder,
      { new: true }
    );

    if (Order) {
      return res.status(200).json({
        msg: `Order ${Order_ID} is Updated Successfully`,
        data: UpdatedOrder,
      });
    } else {
      return res.status(404).json({
        Error: `Order ${Order_ID} Not Found`,
      });
    }
  } else {
    return res.status(404).json({
      Error: "Invalid Data",
      Description: `${OrderValid.errors[0].instancePath.split("/")[1]}: ${
        OrderValid.errors[0].keyword
      } ==> ${OrderValid.errors[0].message}`,
    });
  }
};

module.exports = {
  GetAllOrders,
  GetOrderByID,
  AddOrder,
  UpdateOrder,
  DeleteOrder,
};
