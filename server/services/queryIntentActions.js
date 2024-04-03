import User from "../mongodb/models/user.js";
import Post from "../mongodb/models/post.js";

export const queryIntentActions = {
  count_users: async () => {
    const count = await User.countDocuments();
    return `The total number of users is ${count}.`;
  },
  count_posts: async () => {
    const count = await Post.countDocuments();
    return `The total number of posts is ${count}.`;
  },
  posts_by_userX: async ({ user }) => {
    if (!user) throw new Error("User name is required for this intent.");
    const posts = await Post.find({ name: user });
    return `Found ${posts.length} posts by user ${user}.`;
  },
  user_by_email: async ({ email }) => {
    if (!email) throw new Error("Email is required for this intent.");
    const user = await User.findOne({ email });
    return user
      ? `User details for email ${email}: ${JSON.stringify(user)}`
      : `No user found with email ${email}.`;
  },
  count_posts_by_user: async ({ user }) => {
    if (!user) throw new Error("User name is required for this intent.");
    const count = await Post.countDocuments({ name: user });
    return `The total number of posts by ${user} is ${count}.`;
  },
};
