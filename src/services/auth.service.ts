import prisma from '../lib/prisma';
import bcrypt from 'bcrypt';

export async function createUser(
  email: string,
  username: string,
  password: string,
) {

  const existingUser = await prisma.user.findUnique({where: {email}});
  
  if (existingUser) {
    throw new Error(
      "Username already exist",
    )
  }
  
  const passwordHash = await bcrypt.hash(password, 10);
  
  return prisma.user.create({
    data: {
      email,
      username,
      passwordHash
    }
  });
}

export async function retrieveUser(
  email: string,
  password: string
) {
  const user = await prisma.user.findUnique({where: {email}});

  if (!user) {
    throw new Error('User Does not exist');
  }

  const matchPass = await bcrypt.compare(password, user.passwordHash);

  if (!matchPass) {
    throw new Error('Invalid credentials');
  }
   return user;
}