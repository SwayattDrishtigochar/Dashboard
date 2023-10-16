import Equipment from '../models/equipmentModel.js';

//controller for registering new equipment
const registerEquipment = async (req, res) => {
  try {
    const newEquipment = await Equipment.create(req.body);
    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(500);
    throw new Error('Error Creating Equipment');
  }
};

//controller for getting all equipment
const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find({});

    res.status(200).json(equipment);
  } catch (error) {
    res.status(500);
    throw new Error('Error Getting Equipment');
  }
};

//c ontroller for getting equipment by id
const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500);
    throw new Error('Error Getting Equipment');
  }
};

export { registerEquipment, getAllEquipment, getEquipmentById };
