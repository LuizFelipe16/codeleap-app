import { query as q } from 'faunadb';
import bcrypt from 'bcrypt';

import { NextApiRequest, NextApiResponse } from 'next';
import { fauna } from '../../../services/fauna';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const {
      username,
      email,
      password
    } = req.body;

    const passwordEncrypted = await bcrypt.hashSync(String(password), bcrypt.genSaltSync(10));

    const data = {
      username,
      email,
      password: passwordEncrypted
    };

    await fauna.query(
      q.Create(
        q.Collection("users"),
        { data }
      )
    ).then(() => {
      return res.status(201).json({
        message: "Created user."
      });
    }).catch(() => {
      return res.status(200).json({
        error: "This user already exists. Use another email!"
      });
    });
  }
}