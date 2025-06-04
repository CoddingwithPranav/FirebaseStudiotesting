"use server";

// This is a stub file for server actions.
// In a real application, these would interact with your authentication provider (e.g., Firebase Admin SDK, custom DB).

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  console.log("Server Action: Login attempt for", email);

  // Simulate server-side validation and auth check
  if (!email || !password) {
    return { success: false, error: "Email and password are required." };
  }

  // Example: check against a mock user (replace with actual auth logic)
  if (email === "test@example.com" && password === "password123") {
    // In a real app, you'd create a session, set cookies, etc.
    return { success: true, message: "Login successful (mock)." };
  } else {
    return { success: false, error: "Invalid credentials (mock)." };
  }
}

export async function signupUser(formData: FormData) {
  const nickname = formData.get('nickname') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  
  console.log("Server Action: Signup attempt for", email, "with nickname", nickname);

  if (!nickname || !email || !password) {
    return { success: false, error: "All fields are required." };
  }
  
  // Simulate user creation
  return { success: true, message: "Signup successful (mock). Please login." };
}
