// NAV-PVT (0x01 0x07)
// Navigation Position Velocity Time Solution
//
// Note that during a leap second there may be more (or less) than 60 seconds in
// a minute; see the description of leap seconds for details.
//
// This message combines Position, velocity and time solution in LLH,
// including accuracy figures
//
// WARNING: For firmware version 7, this message is a different length.
//

export const CLASS_ID = 1;
export const MESSAGE_ID = 7;

export interface NavPvt {
  i_tow: number;            // GPS Millisecond time of week [ms]
  year: number;             // Year (UTC)
  month: number;             // Month, range 1..12 (UTC)
  day: number;               // Day of month, range 1..31 (UTC)
  hour: number;              // Hour of day, range 0..23 (UTC)
  min: number;               // Minute of hour, range 0..59 (UTC)
  sec: number;               // Seconds of minute, range 0..60 (UTC)

  valid: number;             // Validity flags
  t_acc: number;            // time accuracy estimate [ns] (UTC)
  nano: number;              // fraction of a second [ns], range -1e9 .. 1e9 (UTC)

  fix_type: number;           // GNSS fix Type, range 0..5
  flags: number;             // Fix Status Flags
  flags2: number;            // Additional Flags

  num_sv: number;             // Number of SVs used in Nav Solution
  lon: number;                // Longitude [deg / 1e-7]
  lat: number;                // Latitude [deg / 1e-7]
  height: number;             // Height above Ellipsoid [mm]
  h_msl: number;              // Height above mean sea level [mm]
  h_acc: number;             // Horizontal Accuracy Estimate [mm]
  v_acc: number;             // Vertical Accuracy Estimate [mm]

  vel_n: number;              // NED north velocity [mm/s]
  vel_e: number;              // NED east velocity [mm/s]
  vel_d: number;              // NED down velocity [mm/s]
  g_speed: number;            // Ground Speed (2-D) [mm/s]
  heading: number;            // Heading of motion 2-D [deg / 1e-5]
  s_acc: number;             // Speed Accuracy Estimate [mm/s]
  head_acc: number;          // Heading Accuracy Estimate (both motion & vehicle)
                         // [deg / 1e-5]

  p_dop: number;             // Position DOP [1 / 0.01]
  reserved1: number[];       // Reserved

  head_veh: number;           // Heading of vehicle (2-D) [deg / 1e-5]
  mag_dec: number;            // Magnetic declination [deg / 1e-2]
  mag_acc: number;           // Magnetic declination accuracy [deg / 1e-2]
}

// Constants for valid flag
export const VALID_DATE = 1;            // Valid UTC Date
export const VALID_TIME = 2;            // Valid
export const VALID_FULLY_RESOLVED = 4;  // UTC time of day has been fully resolved
                                        // (no seconds uncertainty)
export const VALID_MAG = 8;             // Valid Magnetic Declination

// Constants for fix_type
export const FIX_TYPE_NO_FIX = 0;
export const FIX_TYPE_DEAD_RECKONING_ONLY = 1;
export const FIX_TYPE_2D = 2;                           // Signal from only 3 SVs,
                                                // constant altitude assumed
export const FIX_TYPE_3D = 3;
export const FIX_TYPE_GNSS_DEAD_RECKONING_COMBINED = 4; // GNSS + Dead reckoning
export const FIX_TYPE_TIME_ONLY = 5;                    // Time only fix (High precision
                                                // devices)

// Constants for flags
export const FLAGS_GNSS_FIX_OK = 1;          // i.e. within DOP & accuracy masks
export const FLAGS_DIFF_SOLN = 2;            // DGPS used
export const FLAGS_PSM_MASK = 28;            // Power Save Mode
export const PSM_OFF = 0;                       // PSM is off
export const PSM_ENABLED = 4;                   // Enabled (state before acquisition)
export const PSM_ACQUIRED = 8;                  // Acquisition
export const PSM_TRACKING = 12;                 // Tracking
export const PSM_POWER_OPTIMIZED_TRACKING = 16; // Power Optimized Tracking
export const PSM_INACTIVE = 20;                 // Inactive
export const FLAGS_HEAD_VEH_VALID = 32;         // heading of vehicle is valid
export const FLAGS_CARRIER_PHASE_MASK = 192; // Carrier Phase Range Solution Status
export const CARRIER_PHASE_NO_SOLUTION = 0;     // no carrier phase range solution
export const CARRIER_PHASE_FLOAT = 64;          // carrier phase float solution (no fixed
                                        // integer measurements have been used to
                                        // calculate the solution)
export const CARRIER_PHASE_FIXED = 128;         // fixed solution (>=1 fixed integer
                                        // carrier phase range measurements have
                                        // been used to calculate  the solution)

// Constants for flags2
export const FLAGS2_CONFIRMED_AVAILABLE = 32;   // information about UTC Date and Time of
                                        // Day validity confirmation is available
export const FLAGS2_CONFIRMED_DATE = 64;        // UTC Date validity could be confirmed
export const FLAGS2_CONFIRMED_TIME = 128;       // UTC Time of Day could be confirmed