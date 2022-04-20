import { query as q } from 'faunadb';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { NextApiRequest, NextApiResponse } from 'next';
import { fauna } from '../../../services/fauna';

interface User {
  data: {
    email: string;
    username: string;
    password: string;
  };
  ts: number;
  ref: {
    id: string;
  };
}

const SignIn = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === 'POST') {
    const {
      email,
      password
    } = request.body;

    await fauna.query<User>(
      q.Get(
        q.Match(q.Index("user_by_email"), email)
      )
    ).then((resp) => {
      const passwordMatch = bcrypt.compareSync(password, resp.data?.password);

      if (!passwordMatch) {
        return response.status(200).json({
          error: "Incorrect email/password"
        });
      }

      const token = sign(
        {
          username: resp.data.username
        },
        process.env.AUTH_SECRET,
        {
          subject: resp.ref.id,
          expiresIn: "1d"
        }
      );

      return response.status(200).json({
        message: "Sign in successfully! Wait a moment",
        token: token
      });
    }).catch(() => {
      return response.status(200).json({
        error: "Incorrect email/password"
      });
    });
  }

  return response.status(405).json({
    error: `Method '${request.method}' Not Allowed`
  });
}

export default SignIn;