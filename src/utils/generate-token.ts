import jwt from 'jsonwebtoken';

// Helper function to generate JWT token
const generateToken = (id: string): string => {
  if (!id) {
    throw new Error("User ID is required to generate a token.");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  // Create the JWT token with the user ID and set an expiration time
  const token = jwt.sign({ id }, secret, { expiresIn: "7d" });
  return token;
};

export default generateToken;
