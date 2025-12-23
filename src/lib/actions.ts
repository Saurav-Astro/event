'use server';

import { z } from "zod";

const registrationSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255).toLowerCase(),
  eventName: z.string().min(1).max(100).trim(),
});

const contactSchema = z.object({
  name: z.string().min(2).max(100).trim(),
  email: z.string().email().max(255).toLowerCase(),
  message: z.string().min(10).max(5000).trim(),
});

/**
 * Handles event registration with input validation
 * @param data - Raw form data to validate and process
 * @returns Success/failure response
 */
export async function handleRegistration(data: unknown) {
  const validatedFields = registrationSchema.safeParse(data);

  if (!validatedFields.success) {
    return { success: false, message: 'Invalid data provided.' };
  }

  // In a real app, you would save this to a database.
  console.log('New Registration:', validatedFields.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return { success: true, message: 'Registration successful!' };
}

/**
 * Handles contact form submissions with input validation
 * @param data - Raw form data to validate and process
 * @returns Success/failure response
 */
export async function handleContactSubmission(data: unknown) {
    const validatedFields = contactSchema.safeParse(data);
  
    if (!validatedFields.success) {
      return { success: false, message: 'Invalid data provided.' };
    }
  
    // In a real app, you would send an email or save to a database.
    console.log('New Contact Form Submission:', validatedFields.data);
  
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return { success: true, message: 'Your message has been sent!' };
  }
