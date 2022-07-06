const { Profile } = require('../model');

// eslint-disable-next-line no-return-await
exports.getProfileItem = async (profileId) => await Profile.findOne({
  where: {
    id: profileId,
  },
});
