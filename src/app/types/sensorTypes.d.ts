import header from './stdMsgTypes';

export interface NavSatStatus {
  STATUS_NO_FIX: number;
  STATUS_FIX: number;
  STATUS_SBAS_FIX: number;
  STATUS_GBAS_FIX: number;
  SERVICE_GPS: number;
  SERVICE_GLONASS: number;
  SERVICE_COMPASS: number;
  SERVICE_GALILEO: number;
  status: number;
  service: number;
}

export interface NavSatFix {
    COVARIANCE_TYPE_UNKNOWN: number;
    COVARIANCE_TYPE_APPROXIMATED: number;
    COVARIANCE_TYPE_DIAGONAL_KNOWN: number;
    COVARIANCE_TYPE_KNOWN: number;
    header: Header;
    status: NavSatStatus;
    latitude: number;
    longitude: number
    altitude: number;
    position_covariance: Float64Array[9]
    position_covariance_type: number;
}
