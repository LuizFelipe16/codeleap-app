import { NextApiRequest, NextApiResponse } from "next";
import { query as q } from 'faunadb';
import bcrypt from 'bcrypt';

import { fauna } from "../../../services/fauna";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { id } = req.query;
    const {
      email,
      username,
      user_email,
      password
    } = req.body;

    await fauna.query(
      q.Get(
        q.Match(q.Index("user_by_email"), email)
      )
    ).then(() => {
      return res.status(200).json({
        error: 'This email already belongs to another account.'
      });
    }).catch(() => {
      const passwordEncrypted = bcrypt.hashSync(String(password), bcrypt.genSaltSync(10));

      const data = {
        username,
        email,
        password: passwordEncrypted
      };

      fauna.query(
        q.Update(
          q.Ref(q.Collection("users"), id),
          {
            data
          }
        )
      );

      return res.status(200).json({
        message: 'Account successfully updated! Sign in again.'
      });
    });
  }
}