const Address = require('../models/address');

// Create a new address
exports.createAddress = async (req, res) => {
  const { firstName, lastName, email, address, pincode, city, state, phoneNumber } = req.body;
  try {
    // Associate the address with the logged-in user
    const newAddress = new Address({
      user: req.user._id,
      firstName,
      lastName,
      email,
      address,
      pincode,
      city,
      state,
      phoneNumber,
    });
    const savedAddress = await newAddress.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all addresses for the logged-in user
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user._id });
    res.json(addresses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single address by ID (only if it belongs to the user)
exports.getAddressById = async (req, res) => {
  try {
    const address = await Address.findOne({ _id: req.params.id, user: req.user._id });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json(address);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an address
exports.updateAddress = async (req, res) => {
  try {
    const address = await Address.findOne({ _id: req.params.id, user: req.user._id });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    // Update fields
    address.firstName = req.body.firstName || address.firstName;
    address.lastName = req.body.lastName || address.lastName;
    address.email = req.body.email || address.email;
    address.address = req.body.address || address.address;
    address.pincode = req.body.pincode || address.pincode;
    address.city = req.body.city || address.city;
    address.state = req.body.state || address.state;
    address.phoneNumber = req.body.phoneNumber || address.phoneNumber;

    if (typeof req.body.isPrimary === 'boolean') {
        address.isPrimary = req.body.isPrimary;
      }
    

    if (req.body.isPrimary === true) {
    // Unset isPrimary for all other addresses of this user
    await Address.updateMany(
        { user: req.user._id, _id: { $ne: address._id } },
        { $set: { isPrimary: false } }
    );
    }
    const updatedAddress = await address.save();
    res.json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!address) {
      return res.status(404).json({ message: 'Address not found' });
    }
    res.json({ message: 'Address deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
