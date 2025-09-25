const { BusinessProfile, User } = require("../models");

exports.updateBusinessProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id); 
    if (!user) return res.status(404).json({ message: "User not found" });

    const profile = await BusinessProfile.findOne({ where: { user_id: user.user_id } });
    if (!profile) return res.status(404).json({ message: "Profile not found" });

    await profile.update(req.body);

    res.json({ message: "Business profile updated", profile });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
