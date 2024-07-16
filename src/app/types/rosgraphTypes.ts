import { Header } from "./stdMsgTypes"; // Assuming 'std_msgs/Header' is the correct import path

export enum LogLevel {
  DEBUG = 1,
  INFO = 2,
  WARN = 4,
  ERROR = 8,
  FATAL = 16,
}

export interface Log {
  header: Header;
  level: LogLevel;
  name: string;
  msg: string;
  file: string;
  function: string;
  line: number;
  topics: string[];
}
