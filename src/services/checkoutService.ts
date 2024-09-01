import axios from "axios";
import { API_URL } from "../config";
import { PurchaseHistory } from "../types/checkout";

export const fetchPackage = async (packageId: string|undefined) => {
    try {
      const response = await axios.get(`${API_URL}/packages/${packageId}`);
      return response.data
    } catch (error) {
      console.error('Error fetching package:', error);
    }
  };
export const postOrder = async (purchaseData: PurchaseHistory) => {
    try {
      const response = await axios.post(`${API_URL}/purchaseHistory`, {
        userId: purchaseData.userId,
        packageId: purchaseData.packageId,
        paymentMethod: purchaseData.paymentMethod,
        purchaseDate: purchaseData.purchaseDate
      });
      return response.data
    } catch (error) {
      console.error('Error post order:', error);
    }
  };

export const showOrder = async (orderId: string) => {
    const response = await axios.get<PurchaseHistory[]>(`${API_URL}/purchaseHistory`);
    const orders = response.data;
    const order = orders.find((o) => o.id === orderId);

    const packageResponse = await fetchPackage(order?.packageId);

    const returnData = {
        orderId: order?.id,
        ...packageResponse
    }
    return returnData;
}  