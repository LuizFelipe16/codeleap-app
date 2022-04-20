import { query as q } from 'faunadb';
import bcrypt from 'bcrypt';

import { NextApiRequest, NextApiResponse } from 'next';
import { fauna } from '../../../services/fauna';

interface UserQueryResponse {
  after?: {
    id: string;
  };
  data: {
    data: {
      email: string;
      name: string;
    };
    ts: number;
    ref: {
      id: string;
    };
  };
}

const MethodsUsers = async (request: NextApiRequest, response: NextApiResponse) => {
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

    // const user = await fauna.query<UserQueryResponse>(
    //   q.Get(
    //     q.Match(q.Index("user_by_email"), email)
    //   )
    // );

    // if (user) {

    // }

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
      })



    } catch (err) {
      return response.status(400).json({
        error: "Unexpected error. Unable to register the user."
      });
    }
  }

  if (request.method === 'GET') {
    const { email } = request.body;

    return await fauna.query<UserQueryResponse>(
      q.Get(
        q.Match(q.Index("user_by_email"), email)
      )
    ).then(res => {
      return response.status(200).json({
        message: 'User found successfully',
        user: res.data
      });
    });
  }

  return response.status(405).json({
    error: `Method '${request.method}' Not Allowed`
  });
}

export default MethodsUsers;