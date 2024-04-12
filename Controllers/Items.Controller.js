const ItemValid = require("../Utils/ItemValidation");
const ItemModel = require("../Models/ItemModel");

let S_ID = 0;

let GetAllItems = async (req, res) => {
  let AllStudents = await ItemModel.find({});
  return res.json(AllStudents);
};

let GetItemByID = async (req, res) => {
  let Item_ID = req.params.id;
  const Item = await ItemModel.find({
    id: Item_ID,
  });
  if (Item) {
    return res.status(200).json({ msg: "Item Found", data: Item });
  } else {
    return res.status(200).json({ msg: "Item Not Found" });
  }
};

let AddItem = async (req, res) => {
  let newItem = req.body;
  if (ItemValid(newItem)) {
    newItem.id = ++S_ID;
    let Item = new ItemModel(newItem);
    await Item.save();
    return res
      .status(200)
      .json({ msg: "Student Added Successfully", data: newItem });
  } else {
    return res.status(200).json({
      Error: "Invalid Data",
      Description: `${ItemValid.errors[0].instancePath.split("/")[1]}: ${
        ItemValid.errors[0].keyword
      } ==> ${ItemValid.errors[0].message}`,
    });
  }
};

let UpdateItem = async (req, res) => {
  if (ItemValid(req.body)) {
    let Item_ID = req.params.id;
    let updatedItem = {
      name: req.body.name,
      age: req.body.age,
      dept: req.body.dept,
    };
    const Item = await ItemModel.findOneAndUpdate(
      { name: Item_ID },
      updatedItem,
      { new: true }
    );
    if (Item) {
      return res.status(200).json({
        msg: `Item ${Item_ID} is Updated Successfully`,
        data: updatedData,
      });
    } else {
      return res.status(404).json({
        Error: `Item ${Item_ID} Not Found`,
      });
    }
  } else {
    return res.status(404).json({
      Error: "Invalid Data",
      Description: `${ItemValid.errors[0].instancePath.split("/")[1]}: ${
        ItemValid.errors[0].keyword
      } ==> ${ItemValid.errors[0].message}`,
    });
  }
};

let DeleteItem = async (req, res) => {
  let Item_ID = req.params.id;
  const deletedItem = await ItemModel.findOneAndDelete({
    id: Item_ID,
  });

  return res.status(200).json({
    msg: `Item ${Item_ID} Deleted Successfully`,
    DeletedData: deletedItem,
  });
};

module.exports = {
  GetAllItems,
  GetItemByID,
  AddItem,
  UpdateItem,
  DeleteItem,
};
