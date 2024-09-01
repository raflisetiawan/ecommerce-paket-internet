import axios from "axios";
import { API_URL } from "../config";
import { AuthenticatedUser } from "../types/auth";
import { fetchPackage } from "./checkoutService";
import { PurchaseHistory } from "../types/checkout";


export const fetchCustomerData = async (user: AuthenticatedUser) => {
  try {
    const historyResponse = await axios.get(`${API_URL}/purchaseHistory?userId=${user.id}`);
    const purchaseHistory = historyResponse.data;

    const result = await Promise.all(
      purchaseHistory.map(async (history: PurchaseHistory) => {
        const packageResponse = await fetchPackage(history.packageId);
        if(history.id !== undefined){
          const returnData: PackagePurchaseHistory = {
            id: history.id,
            packageName: packageResponse.name,
            validity: packageResponse.validity,
            purchaseDate: history.purchaseDate
          };
          return returnData;
        }
      })
    );

    return result;
  } catch (error) {
    console.error('Error fetching customer data:', error);
  }
};
