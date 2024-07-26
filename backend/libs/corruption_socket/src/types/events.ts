import {
  MESSAGE_DELTA_CREATED,
  MESSAGE_END,
  TEXT_CREATED,
} from '@app/constants';

export interface CommunicationServerToClientEvents {
  [MESSAGE_DELTA_CREATED]: (message: string) => void;
  [MESSAGE_END]: (message: string) => void;
  [TEXT_CREATED]: (message: string) => void;
}
