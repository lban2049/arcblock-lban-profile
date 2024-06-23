import User from '../../models/User';
import dbConnect from '../../utils/dbconnect';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
    const data = await POST(req);
    return res.status(200).json(data);
  } else {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed',
    });
  }
}

// Create a new user
export async function POST(req) {
  const { id, name, email, mobile, introduction } = req.body;
  try {
    await dbConnect();
    let user = await User.findOne({ id });
    if (!user) {
      // add
      user = await User.create({
        id,
        name,
        email,
        mobile,
        introduction,
      });
    } else {
      // edit
      user.name = name;
      user.email = email;
      user.mobile = mobile;
      user.introduction = introduction;

      await user.save();
    }

    return {
      success: true,
      message: 'User saved',
      data: {
        user: user.toJSON(),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      success: false,
      message: 'Something went wrong',
      data: null,
    };
  }
}
