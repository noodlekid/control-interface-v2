// NAV-RELPOSNED (0x01 0x3C)
// Relative Positioning Information in NED frame
//
// The NED frame is defined as the local topological system at the reference
// station. The relative position vector components in this message, along with
// their associated accuracies, are given in that local topological system
// This message contains the relative position vector from the Reference Station
// to the Rover, including accuracy figures, in the local topological system
// defined at the reference station
//
// Supported on:
//  - u-blox 8 / u-blox M8 from protocol version 20 up to version 23.01 (only
//    with High Precision GNSS products)
//

export default interface NavRelPosNed {
  CLASS_ID: 1;
  MESSAGE_ID: 60;

  version: number; // Message version (0x00 for this version)
  reserved0: number; // Reserved
  refStationId: number; // Reference Station ID. Must be in the range
  // 0..4095
  iTow: number; // GPS time of week of the navigation epoch
  // [ms]

  relPosN: number; // North component of relative position vector
  // [cm]
  relPosE: number; // East component of relative position vector
  // [cm]
  relPosD: number; // Down component of relative position vector
  // [cm]

  relPosHPN: number; // High-precision North component of relative
  // position vector. [0.1 mm]
  // Must be in the range -99 to +99.
  // The full North component of the relative
  // position vector, in units of cm, is given by
  // relPosN + (relPosHPN * 1e-2)
  relPosHPE: number; // High-precision East component of relative
  // position vector. [0.1 mm]
  // Must be in the range -99 to +99.
  // The full East component of the relative
  // position vector, in units of cm, is given by
  // relPosE + (relPosHPE * 1e-2)
  relPosHPD: number; // High-precision Down component of relative
  // position vector. [0.1 mm]
  // Must be in the range -99 to +99.
  // The full Down component of the relative
  // position vector, in units of cm, is given by
  // relPosD + (relPosHPD * 1e-2)

  reserved1: number; // Reserved

  accN: number; // Accuracy of relative position North
  // component [0.1 mm]
  accE: number; // Accuracy of relative position East component
  // [0.1 mm]
  accD: number; // Accuracy of relative position Down component
  // [0.1 mm]

  flags: number;
  FLAGS_GNSS_FIX_OK: 1; // A valid fix (i.e within DOP & accuracy
  // masks)
  FLAGS_DIFF_SOLN: 2; // Set if differential corrections were applied
  FLAGS_REL_POS_VALID: 4; // Set if relative position components and
  // accuracies are valid
  FLAGS_CARR_SOLN_MASK: 24; // Carrier phase range solution status:
  FLAGS_CARR_SOLN_NONE: 0; // No carrier phase range solution
  FLAGS_CARR_SOLN_FLOAT: 8; // Float solution. No fixed integer carrier
  // phase measurements have been used to
  // calculate the solution
  FLAGS_CARR_SOLN_FIXED: 16; // Fixed solution. One or more fixed
  // integer carrier phase range measurements
  // have been used to calculate the solution
  FLAGS_IS_MOVING: 32; // if the receiver is operating in moving
  // baseline mode (not supported in protocol
  // versions less than 20.3)
  FLAGS_REF_POS_MISS: 64; // Set if extrapolated reference position was
  // used to compute moving baseline solution
  // this epoch (not supported in protocol
  // versions less than 20.3)
  FLAGS_REF_OBS_MISS: 128; // Set if extrapolated reference observations
  // were used to compute moving baseline
  // solution this epoch (not supported in
  // protocol versions less than 20.3)
}
