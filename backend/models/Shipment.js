const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipient: {
    name: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  },
  status: {
    type: String,
    enum: ['Pending', 'In Transit', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Office',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

shipmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Shipment = mongoose.model('Shipment', shipmentSchema);

module.exports = Shipment;

