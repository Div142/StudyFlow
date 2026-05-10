import { User } from "../models/User.js";
import { Workspace } from "../models/Workspace.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { signToken } from "../utils/tokens.js";

const sendAuth = (res, user, statusCode = 200) => {
  const token = signToken(user);
  res.status(statusCode).json({
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
      theme: user.theme,
    },
  });
};

export const register = asyncHandler(async (req, res) => {
  const existing = await User.findOne({ email: req.body.email });
  if (existing) {
    throw new ApiError(409, "Email is already registered");
  }

  const user = await User.create(req.body);
  await Workspace.create({
    name: "Semester Sprint",
    description: "Your first StudyFlow workspace",
    owner: user._id,
    members: [{ user: user._id, role: "owner" }],
  });

  sendAuth(res, user, 201);
});

export const login = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select("+password");
  if (!user || !(await user.comparePassword(req.body.password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  sendAuth(res, user);
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
