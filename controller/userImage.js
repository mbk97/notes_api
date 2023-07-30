import profileImage from "../model/profileImage.js";
import User from "../model/user.js";

const getUserImage = async (req, res) => {
  const user = await User.findById(req.user.id);
  const userImg = await profileImage
    .find({ email: user.email })
    .sort({ _id: -1 })
    .limit(1);
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

const uploadUserImage = async (req, res) => {
  try {
    if (res.statusCode === 200) {
      const createImg = await profileImage.create({
        email: req.user.email,
        image: req.file.path,
      });

      res.status(200).json({
        message: "Image added successfully",
        pofileImg: {
          image: createImg.image,
          id: createImg.id,
          user: createImg.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export { getUserImage, uploadUserImage };
