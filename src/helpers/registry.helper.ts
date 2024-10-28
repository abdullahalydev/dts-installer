/*
! DEPRECATED FILE
 */

// helpers
import axiosHelper from "./axios.helper";

export default class RegistryHelper {
  private registryUrl: string;

  constructor({ url }) {
    this.registryUrl = url;
  }

  public fetchPackageDetails({ name, version }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const request = await axiosHelper({
        method: "GET",
        validateStatus: () => true,
        baseURL: this.registryUrl,
        url: `/${name}/${version || ""}`,
      });

      resolve({
        code: request.status,
        status: request.statusText,
        data: request.data,
      });
    });
  }
}
