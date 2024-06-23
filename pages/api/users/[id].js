import User from '../../../models/User';
import dbConnect from '../../../utils/dbconnect';

export default async function handler(req, res) {
  // Handle any other HTTP method
  const { query, method } = req;
  if (method !== 'GET') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const id = query.id;
  const data = await GET(id);
  return res.status(200).json(data);
}

// get user
export async function GET(id) {
  try {
    await dbConnect();
    const user = await User.findOne({ id });
    if (!user) {
      return { success: false, message: 'User not found', data: null };
    }
    return {
      success: true,
      message: 'User fetched',
      data: {
        ...user.toJSON(),
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
