import { query as q } from 'faunadb';
import bcrypt from 'bcrypt';

import { NextApiRequest, NextApiResponse } from 'next';
import { fauna } from '../../../services/fauna';

const SignUp = async (request: NextApiRequest, response: NextApiResponse) => {
  if (request.method === "POST") {
    const {
      username,
      email,
      password
    } = request.body;

    const passwordEncrypted = await bcrypt.hashSync(String(password), bcrypt.genSaltSync(10));

    const data = {
      username,
      email,
      password: passwordEncrypted
    };

    try {
      await fauna.query(
        q.Create(
          q.Collection("users"),
          { data }
        )
      ).then(() => {
        return response.status(201).json({
          message: "Created user."
        });
      }).catch(() => {
        return response.status(200).json({
          error: "This user already exists. Use another email!"
        });
      });

    } catch (err) {
      return response.status(400).json({
        error: "Unexpected error. Unable to register the user."
      });
    }
  }

  return response.status(405).json({
    error: `Method '${request.method}' Not Allowed`
  });
}

export default SignUp;