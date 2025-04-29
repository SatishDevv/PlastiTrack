import { ENDPOINT } from "@/constant/endpoint.const";
import { axiosInstance } from "@/utils/axios.util";

export default class TrackFlowService {
  static fetchTrackFlowSTatus = () => {
    return axiosInstance.get(
      ENDPOINT.API_BASE_URL + ENDPOINT.TRACKFLOW.API.FETCH_TRACK_FLOW
    );
  };
}
