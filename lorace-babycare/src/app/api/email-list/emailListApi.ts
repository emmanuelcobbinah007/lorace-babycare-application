// Email List API functions
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export interface EmailListItem {
  id: string;
  email: string;
  createdAt: string;
}

// Get all emails from the email list
export const getEmailList = async (): Promise<EmailListItem[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/email-list`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to fetch email list');
    }
    throw new Error('Failed to fetch email list');
  }
};

// Delete an email from the list
export const deleteEmail = async (id: string): Promise<EmailListItem> => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/email-list/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Failed to delete email');
    }
    throw new Error('Failed to delete email');
  }
};
