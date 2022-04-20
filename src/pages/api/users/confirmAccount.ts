import { NextApiRequest, NextApiResponse } from 'next';
import { query as q } from 'faunadb';
import bcrypt from 'bcrypt';

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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      email,
      password
    } = req.body;

    await fauna.query<User>(
      q.Get(
        q.Match(q.Index("user_by_email"), email)
      )
    ).then((resp) => {
      const passwordMatch = bcrypt.compareSync(password, resp.data?.password);

      if (!passwordMatch) {
        return res.status(200).json({
          error: "Account not verified. Try again",
          isAccountConfirm: false
        });
      }

      return res.status(200).json({
        message: "Account verified successfully!",
        isAccountConfirm: true
      });
    }).catch(() => {
      return res.status(200).json({
        error: "Account not verified. Try again",
        isAccountConfirm: false
      });
    });
  }
}