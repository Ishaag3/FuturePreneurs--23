import connectMongoDB from '@/libs/mongodb';
import { Users } from '@/models/user';
import { jwtVerify } from 'jose';

export default async function getTokenDetails(session) {
  try {
    connectMongoDB();

    const token = session?.accessTokenBackend;
    console.log('token', token);

    const tokenDetails = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET)
    );

    const userId = tokenDetails.payload._id;
    const user = await Users.findById(userId);
    console.log('user', user);

    if (user.teamRole != '0') {
      throw new Error('Not allowed bro');
    }

    console.log('user.teamId', user.teamId);
    return user.teamId;
  } catch (err) {
    console.log('Kuch Error hogya bro', err);
  }
}