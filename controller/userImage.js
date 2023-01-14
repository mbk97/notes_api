import profileImage from "../model/profileImage.js";
import User from "../model/user.js";

const getUserImage = async (req, res) => {
  const user = await User.findById(req.user.id);
  const userImg = await profileImage
    .find({ email: user.email })
    .sort({ _id: -1 })
    .limit(1);
  console.log(userImg[0], "I dey here");
  console.log(user.email.toString() === userImg[0].email, "user is dey here");
  if (user.email.toString() === userImg[0].email) {
    res.status(200).json({
      message: userImg[0].image,
    });
  } else {
    res.status(400).json({
      message: "This is not your image",
    });
  }
};

export { getUserImage };
