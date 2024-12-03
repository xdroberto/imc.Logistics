const Shipment = require('../models/Shipment');

exports.getAllShipments = async (req, res) => {
  try {
    const shipments = await Shipment.find().populate('sender', 'email').populate('office', 'name');
    res.json(shipments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getShipmentById = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id).populate('sender', 'email').populate('office', 'name');
    if (!shipment) {
      return res.status(404).json({ message: 'Envío no encontrado' });
    }
    res.json(shipment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createShipment = async (req, res) => {
  const shipment = new Shipment({
    trackingNumber: generateTrackingNumber(),
    sender: req.user._id, // Asumiendo que el usuario está autenticado
    recipient: req.body.recipient,
    office: req.body.office
  });

  try {
    const newShipment = await shipment.save();
    res.status(201).json(newShipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateShipmentStatus = async (req, res) => {
  try {
    const shipment = await Shipment.findById(req.params.id);
    if (!shipment) {
      return res.status(404).json({ message: 'Envío no encontrado' });
    }

    shipment.status = req.body.status;
    const updatedShipment = await shipment.save();
    res.json(updatedShipment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Función auxiliar para generar números de seguimiento únicos
function generateTrackingNumber() {
  return 'TN' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

